import { Component, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { I18N, Dict } from './register.i18n';

const MAX_SECONDS = 180;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  form: FormGroup;
  submitting = false;
  success = false;
  errorMessage = '';

  levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  // voice recording state
  recording = false;
  seconds = 0;
  audioUrl: string | null = null;
  voiceNoteData: string | null = null;
  voiceStatusKey: keyof Dict | '' = '';
  voiceStatusWarn = false;

  private mediaRecorder: MediaRecorder | null = null;
  private mediaStream: MediaStream | null = null;
  private chunks: Blob[] = [];
  private timer: any = null;

  constructor(private fb: FormBuilder, private api: ApiService, private zone: NgZone) {
    this.form = this.fb.group({
      fullNameArabic: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      age: ['', [Validators.required, Validators.min(10), Validators.max(100)]],
      location: ['', Validators.required],
      englishLevel: ['', Validators.required],
      availability: ['', Validators.required],
      workExperience: [''],
      referrals: [''],
    });
  }

  get t(): Dict {
    return I18N.en;
  }

  lvlLabel(l: string): string {
    return (this.t as any)['lvl' + l];
  }

  get voiceStatusText(): string {
    return this.voiceStatusKey ? this.t[this.voiceStatusKey] : '';
  }

  invalid(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && c.touched;
  }

  selectLevel(l: string) {
    this.form.patchValue({ englishLevel: l });
    this.form.get('englishLevel')?.markAsTouched();
  }

  selectAvailability(a: string) {
    this.form.patchValue({ availability: a });
    this.form.get('availability')?.markAsTouched();
  }

  get timerLabel(): string {
    const m = String(Math.floor(this.seconds / 60)).padStart(2, '0');
    const s = String(this.seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  // ── Voice recording ──
  async startRecording() {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      this.voiceStatusKey = 'vNoMic';
      this.voiceStatusWarn = true;
      return;
    }
    this.chunks = [];
    this.voiceNoteData = null;
    this.audioUrl = null;
    this.mediaRecorder = new MediaRecorder(this.mediaStream);

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.chunks.push(e.data);
    };
    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.chunks, { type: this.mediaRecorder?.mimeType || 'audio/webm' });
      const reader = new FileReader();
      reader.onloadend = () => this.zone.run(() => (this.voiceNoteData = reader.result as string));
      reader.readAsDataURL(blob);
      // MediaRecorder events fire outside Angular's zone — run UI updates inside it
      this.zone.run(() => {
        this.audioUrl = URL.createObjectURL(blob);
        this.voiceStatusKey = 'vReady';
        this.voiceStatusWarn = false;
      });
      this.stopStream();
    };

    this.mediaRecorder.start();
    this.recording = true;
    this.seconds = 0;
    this.voiceStatusKey = 'vRecording';
    this.voiceStatusWarn = false;

    this.timer = setInterval(() => {
      this.seconds++;
      if (this.seconds >= MAX_SECONDS) {
        this.stopRecording();
        this.voiceStatusKey = 'vMaxReached';
        this.voiceStatusWarn = true;
      }
    }, 1000);
  }

  stopRecording() {
    clearInterval(this.timer);
    this.timer = null;
    this.recording = false;
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
  }

  deleteRecording() {
    this.stopRecording();
    this.stopStream();
    this.chunks = [];
    this.voiceNoteData = null;
    if (this.audioUrl) URL.revokeObjectURL(this.audioUrl);
    this.audioUrl = null;
    this.seconds = 0;
    this.voiceStatusKey = '';
  }

  private stopStream() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((t) => t.stop());
      this.mediaStream = null;
    }
  }

  // ── Submit ──
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.errorMessage = '';

    const v = this.form.value;
    const payload: any = {
      fullNameArabic: v.fullNameArabic.trim(),
      phoneNumber: v.phoneNumber.trim(),
      age: Number(v.age),
      location: v.location.trim(),
      englishLevel: v.englishLevel,
      availability: v.availability,
      workExperience: v.workExperience?.trim() || undefined,
      referrals: v.referrals?.trim() || undefined,
    };
    if (this.voiceNoteData) {
      payload.voiceNote = this.voiceNoteData;
      payload.voiceNoteDuration = this.seconds;
    }

    this.api.register(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.success = true;
      },
      error: (err) => {
        this.submitting = false;
        const status = err?.status;
        if (status === 409) this.errorMessage = this.t.errDup;
        else this.errorMessage = err?.error?.message || this.t.errGeneric;
      },
    });
  }

  registerAnother() {
    this.success = false;
    this.errorMessage = '';
    this.form.reset({ workExperience: '', referrals: '', englishLevel: '', availability: '' });
    this.deleteRecording();
  }

  ngOnDestroy() {
    this.deleteRecording();
  }
}
