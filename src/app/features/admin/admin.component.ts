import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Applicant, Stats } from '../../core/api.service';
import { AuthService } from '../../core/auth.service';

type CardApplicant = Applicant & {
  voiceUrl?: string;
  voiceLoading?: boolean;
  saved?: boolean;
  saving?: boolean;
};

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  // auth
  username = '';
  password = '';
  loginError = '';

  // dashboard
  tab: 'applicants' | 'export' = 'applicants';
  stats: Stats = { total: 0, withVoice: 0, withoutVoice: 0, accepted: 0, rejected: 0, pending: 0 };

  // filters
  statusFilter = 'all';
  voiceFilter = 'all';
  search = '';
  page = 1;
  pages = 1;
  total = 0;
  readonly limit = 12;
  applicants: CardApplicant[] = [];
  loading = false;

  // edit options
  levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  statuses = ['Pending', 'Accepted', 'Rejected'];

  // export
  exportLevel = 'all';
  exportStatus = 'all';
  exportAvailability = 'all';
  exporting = false;

  availabilities = ['Full-time', 'Part-time'];

  private searchTimer: any = null;

  constructor(private api: ApiService, public auth: AuthService) {}

  ngOnInit() {
    if (this.auth.isLoggedIn) this.loadAll();
  }

  // ── Auth ──
  login() {
    this.loginError = '';
    this.api.login(this.username.trim(), this.password).subscribe({
      next: (res) => {
        this.auth.token = res.token;
        this.username = '';
        this.password = '';
        this.loadAll();
      },
      error: (err) => {
        this.loginError = err?.error?.message || 'Login failed';
      },
    });
  }

  logout() {
    this.auth.logout();
    this.applicants = [];
  }

  // ── Data ──
  private loadAll() {
    this.loadStats();
    this.loadApplicants();
  }

  loadStats() {
    this.api.getStats().subscribe({
      next: (res) => (this.stats = res.data),
      error: (err) => this.handleAuthError(err),
    });
  }

  loadApplicants() {
    this.loading = true;
    this.api
      .getApplicants({
        status: this.statusFilter,
        voice: this.voiceFilter,
        search: this.search.trim() || undefined,
        page: this.page,
        limit: this.limit,
      })
      .subscribe({
        next: (res) => {
          this.applicants = res.data.applicants;
          this.total = res.total;
          this.page = res.page;
          this.pages = res.pages;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.handleAuthError(err);
        },
      });
  }

  resetAndLoad() {
    this.page = 1;
    this.loadApplicants();
  }

  onSearch() {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.resetAndLoad(), 350);
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadApplicants();
    }
  }

  nextPage() {
    if (this.page < this.pages) {
      this.page++;
      this.loadApplicants();
    }
  }

  // ── Per-applicant ──
  save(a: CardApplicant) {
    a.saving = true;
    this.api
      .updateApplicant(a._id, { englishLevel: a.englishLevel, recruitmentStatus: a.recruitmentStatus })
      .subscribe({
        next: () => {
          a.saving = false;
          a.saved = true;
          setTimeout(() => (a.saved = false), 1800);
          this.loadStats();
        },
        error: (err) => {
          a.saving = false;
          this.handleAuthError(err);
        },
      });
  }

  loadVoice(a: CardApplicant) {
    a.voiceLoading = true;
    this.api.getVoiceNote(a._id).subscribe({
      next: (res) => {
        a.voiceLoading = false;
        a.voiceUrl = res.data.voiceNote || undefined;
      },
      error: (err) => {
        a.voiceLoading = false;
        this.handleAuthError(err);
      },
    });
  }

  // ── Export ──
  exportExcel() {
    this.exporting = true;
    this.api.exportCandidates(this.exportLevel, this.exportStatus, this.exportAvailability).subscribe({
      next: (blob) => {
        this.exporting = false;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `candidates-${this.exportLevel}-${this.exportStatus}-${this.exportAvailability}.xlsx`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.exporting = false;
        this.handleAuthError(err);
      },
    });
  }

  private handleAuthError(err: any) {
    if (err?.status === 401 || err?.status === 403) this.logout();
  }
}
