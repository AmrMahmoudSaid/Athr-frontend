import { Injectable } from '@angular/core';

const KEY = 'athr_admin_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  get token(): string {
    return localStorage.getItem(KEY) || '';
  }

  set token(value: string) {
    if (value) localStorage.setItem(KEY, value);
    else localStorage.removeItem(KEY);
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.token = '';
  }
}
