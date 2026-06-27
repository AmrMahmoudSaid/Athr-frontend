import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BASE = environment.apiUrl;

export interface RegisterPayload {
  fullNameArabic: string;
  phoneNumber: string;
  age: number;
  location: string;
  englishLevel: string;
  availability: string;
  workExperience?: string;
  referrals?: string;
  email?: string;
  voiceNote?: string;
  voiceNoteDuration?: number;
}

export interface Applicant {
  _id: string;
  fullNameArabic: string;
  phoneNumber: string;
  age: number;
  location: string;
  englishLevel: string;
  availability?: string;
  workExperience?: string;
  referrals?: string;
  email?: string;
  recruitmentStatus: string;
  hasVoiceNote: boolean;
  createdAt: string;
}

export interface ApplicantsResponse {
  status: string;
  results: number;
  total: number;
  page: number;
  pages: number;
  limit: number;
  data: { applicants: Applicant[] };
}

export interface Stats {
  total: number;
  withVoice: number;
  withoutVoice: number;
  accepted: number;
  rejected: number;
  pending: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  // ── Public ──
  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${BASE}/register`, payload);
  }

  // ── Admin ──
  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${BASE}/admin/login`, { username, password });
  }

  getApplicants(opts: {
    status: string;
    voice: string;
    search?: string;
    page: number;
    limit: number;
  }): Observable<ApplicantsResponse> {
    let params = new HttpParams()
      .set('status', opts.status)
      .set('voice', opts.voice)
      .set('page', opts.page)
      .set('limit', opts.limit);
    if (opts.search) params = params.set('search', opts.search);
    return this.http.get<ApplicantsResponse>(`${BASE}/admin/applicants`, { params });
  }

  getVoiceNote(id: string): Observable<{ data: { voiceNote: string | null; voiceNoteDuration: number | null } }> {
    return this.http.get<any>(`${BASE}/admin/applicants/${id}/voice`);
  }

  getStats(): Observable<{ data: Stats }> {
    return this.http.get<any>(`${BASE}/admin/stats`);
  }

  updateApplicant(id: string, body: { englishLevel?: string; recruitmentStatus?: string }): Observable<any> {
    return this.http.patch(`${BASE}/admin/applicants/${id}`, body);
  }

  exportCandidates(level: string, status: string, availability: string): Observable<Blob> {
    const params = new HttpParams()
      .set('level', level)
      .set('status', status)
      .set('availability', availability);
    return this.http.get(`${BASE}/admin/export`, { params, responseType: 'blob' });
  }
}
