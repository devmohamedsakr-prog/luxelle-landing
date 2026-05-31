import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
  expiresAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

const SESSION_KEY  = 'luxelle-session';
const TOKEN_KEY    = 'luxelle-token';
const USER_KEY     = 'luxelle-user';
const SESSION_COOKIE = 'luxelle_auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private _user   = signal<AuthUser | null>(this.loadUser());
  private _token  = signal<string | null>(this.loadToken());

  readonly currentUser  = this._user.asReadonly();
  readonly token        = this._token.asReadonly();
  readonly isLoggedIn   = computed(() => this._user() !== null && this._token() !== null);
  readonly userInitials = computed(() => {
    const u = this._user();
    if (!u) return '';
    return u.fullName
      .split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  });

  constructor() {
    this.restoreFromCookie();
  }

  async login(request: LoginRequest, rememberMe = false): Promise<AuthResponse> {
    const res = await this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/login`, request
    ).toPromise();
    if (!res) throw new Error('No response from server');
    this.persist(res, rememberMe);
    return res;
  }

  async register(request: RegisterRequest): Promise<AuthResponse> {
    const res = await this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/register`, request
    ).toPromise();
    if (!res) throw new Error('No response from server');
    this.persist(res, false);
    return res;
  }

  logout(): void {
    this._user.set(null);
    this._token.set(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    this.deleteCookie(SESSION_COOKIE);
  }

  getToken(): string | null {
    return this._token();
  }

  private persist(res: AuthResponse, rememberMe: boolean): void {
    this._user.set(res.user);
    this._token.set(res.token);

    const data = JSON.stringify({ token: res.token, user: res.user, expiresAt: res.expiresAt });

    if (rememberMe) {
      localStorage.setItem(TOKEN_KEY, res.token);
      localStorage.setItem(USER_KEY, JSON.stringify(res.user));
      localStorage.setItem(SESSION_KEY, data);
      const expires = new Date(res.expiresAt);
      this.setCookie(SESSION_COOKIE, res.token, expires);
    } else {
      sessionStorage.setItem(TOKEN_KEY, res.token);
      sessionStorage.setItem(USER_KEY, JSON.stringify(res.user));
    }
  }

  private loadToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
        || sessionStorage.getItem(TOKEN_KEY)
        || null;
  }

  private loadUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw) as AuthUser; } catch { return null; }
  }

  private restoreFromCookie(): void {
    if (this._token()) return;
    const cookieToken = this.getCookie(SESSION_COOKIE);
    if (!cookieToken) return;
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return;
    try {
      const session = JSON.parse(raw) as { token: string; user: AuthUser; expiresAt: string };
      if (new Date(session.expiresAt) > new Date()) {
        this._token.set(session.token);
        this._user.set(session.user);
      } else {
        this.logout();
      }
    } catch { this.logout(); }
  }

  private setCookie(name: string, value: string, expires: Date): void {
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  }

  private deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
