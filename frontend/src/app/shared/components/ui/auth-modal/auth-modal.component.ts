import { Component, signal, output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthService, LoginRequest, RegisterRequest } from '../../../../core/services/auth.service';

type Tab = 'login' | 'register';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  animations: [
    trigger('backdrop', [
      transition(':enter', [style({ opacity: 0 }), animate('200ms ease', style({ opacity: 1 }))]),
      transition(':leave', [animate('200ms ease', style({ opacity: 0 }))]),
    ]),
    trigger('panel', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.93) translateY(12px)' }),
        animate('280ms cubic-bezier(0.22,1,0.36,1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease', style({ opacity: 0, transform: 'scale(0.95) translateY(8px)' })),
      ]),
    ]),
  ],
  template: `
<ng-container *ngIf="isOpen()">
  <div @backdrop
    class="fixed inset-0 z-[300] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    (click)="onBackdrop()">
    <div @panel
      class="relative w-full max-w-md rounded-3xl border border-luxelle-medium shadow-[0_24px_80px_-12px_rgba(0,0,0,0.6)] overflow-hidden"
      style="background: var(--bg-secondary);"
      (click)="$event.stopPropagation()">

      <!-- Top gradient accent -->
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-gold/50 to-transparent"></div>

      <!-- Header -->
      <div class="flex items-center justify-between px-6 pt-6 pb-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-gold to-warm-gold flex items-center justify-center">
            <span class="text-luxelle-dark font-bold text-sm leading-none">L</span>
          </div>
          <span class="text-lg font-bold text-luxelle tracking-tight">Luxelle</span>
        </div>
        <button (click)="close()"
          class="w-8 h-8 rounded-xl flex items-center justify-center text-luxelle-tertiary hover:text-luxelle hover:bg-white/[0.05] transition-all"
          type="button">
          <lucide-icon name="x" class="w-4 h-4"></lucide-icon>
        </button>
      </div>

      <!-- Tabs -->
      <div class="flex mx-6 mb-5 rounded-xl overflow-hidden border border-luxelle-subtle bg-luxelle/[0.03]">
        <button
          (click)="setTab('login')"
          [class.bg-rose-gold]="tab() === 'login'"
          [class.text-white]="tab() === 'login'"
          [class.text-luxelle-secondary]="tab() !== 'login'"
          class="flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200">
          Sign In
        </button>
        <button
          (click)="setTab('register')"
          [class.bg-rose-gold]="tab() === 'register'"
          [class.text-white]="tab() === 'register'"
          [class.text-luxelle-secondary]="tab() !== 'register'"
          class="flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200">
          Create Account
        </button>
      </div>

      <!-- Error Banner -->
      <div *ngIf="errorMsg()" class="mx-6 mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
        <lucide-icon name="alert-circle" class="w-4 h-4 flex-shrink-0"></lucide-icon>
        {{ errorMsg() }}
      </div>

      <!-- Login Form -->
      <form *ngIf="tab() === 'login'" (ngSubmit)="onLogin()" class="px-6 pb-6 flex flex-col gap-4" #loginForm="ngForm">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-luxelle-secondary uppercase tracking-wider">Email</label>
          <input
            name="email" type="email" [(ngModel)]="loginData.email" required
            placeholder="your@email.com"
            class="w-full px-4 py-3 rounded-xl border border-luxelle-subtle bg-white/[0.04]
                   text-luxelle placeholder:text-luxelle-tertiary text-sm
                   focus:outline-none focus:border-rose-gold/50 focus:bg-white/[0.06]
                   transition-all duration-200" />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-luxelle-secondary uppercase tracking-wider">Password</label>
          <div class="relative">
            <input
              name="password" [type]="showLoginPwd() ? 'text' : 'password'" [(ngModel)]="loginData.password" required
              placeholder="••••••••"
              class="w-full px-4 py-3 pr-11 rounded-xl border border-luxelle-subtle bg-white/[0.04]
                     text-luxelle placeholder:text-luxelle-tertiary text-sm
                     focus:outline-none focus:border-rose-gold/50 focus:bg-white/[0.06]
                     transition-all duration-200" />
            <button type="button" (click)="showLoginPwd.set(!showLoginPwd())"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-luxelle-tertiary hover:text-luxelle-secondary transition-colors">
              <lucide-icon [name]="showLoginPwd() ? 'eye-off' : 'eye'" class="w-4 h-4"></lucide-icon>
            </button>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <input id="rememberMe" type="checkbox" [(ngModel)]="rememberMe" name="rememberMe"
            class="w-4 h-4 rounded accent-rose-gold cursor-pointer" />
          <label for="rememberMe" class="text-xs text-luxelle-secondary cursor-pointer select-none">Remember me for 7 days</label>
        </div>
        <button type="submit" [disabled]="loading()"
          class="w-full py-3 rounded-xl font-semibold text-sm text-white
                 bg-gradient-to-r from-rose-gold to-warm-gold
                 hover:opacity-90 active:scale-[0.98]
                 disabled:opacity-60 disabled:cursor-not-allowed
                 transition-all duration-200 flex items-center justify-center gap-2">
          <lucide-icon *ngIf="loading()" name="loader" class="w-4 h-4 animate-spin"></lucide-icon>
          {{ loading() ? 'Signing in…' : 'Sign In' }}
        </button>
        <p class="text-center text-xs text-luxelle-tertiary">
          Don't have an account?
          <button type="button" (click)="setTab('register')" class="text-rose-gold hover:underline font-medium">Create one</button>
        </p>
      </form>

      <!-- Register Form -->
      <form *ngIf="tab() === 'register'" (ngSubmit)="onRegister()" class="px-6 pb-6 flex flex-col gap-4" #registerForm="ngForm">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-luxelle-secondary uppercase tracking-wider">Full Name</label>
          <input name="fullName" type="text" [(ngModel)]="registerData.fullName" required
            placeholder="Jane Doe"
            class="w-full px-4 py-3 rounded-xl border border-luxelle-subtle bg-white/[0.04]
                   text-luxelle placeholder:text-luxelle-tertiary text-sm
                   focus:outline-none focus:border-rose-gold/50 focus:bg-white/[0.06]
                   transition-all duration-200" />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-luxelle-secondary uppercase tracking-wider">Email</label>
          <input name="email" type="email" [(ngModel)]="registerData.email" required
            placeholder="your@email.com"
            class="w-full px-4 py-3 rounded-xl border border-luxelle-subtle bg-white/[0.04]
                   text-luxelle placeholder:text-luxelle-tertiary text-sm
                   focus:outline-none focus:border-rose-gold/50 focus:bg-white/[0.06]
                   transition-all duration-200" />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-luxelle-secondary uppercase tracking-wider">Phone <span class="normal-case text-luxelle-tertiary font-normal">(optional)</span></label>
          <input name="phone" type="tel" [(ngModel)]="registerData.phone"
            placeholder="+1 (555) 000-0000"
            class="w-full px-4 py-3 rounded-xl border border-luxelle-subtle bg-white/[0.04]
                   text-luxelle placeholder:text-luxelle-tertiary text-sm
                   focus:outline-none focus:border-rose-gold/50 focus:bg-white/[0.06]
                   transition-all duration-200" />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-luxelle-secondary uppercase tracking-wider">Password</label>
          <div class="relative">
            <input name="password" [type]="showRegPwd() ? 'text' : 'password'" [(ngModel)]="registerData.password" required
              placeholder="Min. 6 characters"
              class="w-full px-4 py-3 pr-11 rounded-xl border border-luxelle-subtle bg-white/[0.04]
                     text-luxelle placeholder:text-luxelle-tertiary text-sm
                     focus:outline-none focus:border-rose-gold/50 focus:bg-white/[0.06]
                     transition-all duration-200" />
            <button type="button" (click)="showRegPwd.set(!showRegPwd())"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-luxelle-tertiary hover:text-luxelle-secondary transition-colors">
              <lucide-icon [name]="showRegPwd() ? 'eye-off' : 'eye'" class="w-4 h-4"></lucide-icon>
            </button>
          </div>
        </div>
        <button type="submit" [disabled]="loading()"
          class="w-full py-3 rounded-xl font-semibold text-sm text-white
                 bg-gradient-to-r from-rose-gold to-warm-gold
                 hover:opacity-90 active:scale-[0.98]
                 disabled:opacity-60 disabled:cursor-not-allowed
                 transition-all duration-200 flex items-center justify-center gap-2">
          <lucide-icon *ngIf="loading()" name="loader" class="w-4 h-4 animate-spin"></lucide-icon>
          {{ loading() ? 'Creating account…' : 'Create Account' }}
        </button>
        <p class="text-center text-xs text-luxelle-tertiary">
          Already have an account?
          <button type="button" (click)="setTab('login')" class="text-rose-gold hover:underline font-medium">Sign in</button>
        </p>
      </form>

    </div>
  </div>
</ng-container>
  `,
})
export class AuthModalComponent implements OnInit {
  private authService = inject(AuthService);

  isOpen   = signal(false);
  tab      = signal<Tab>('login');
  loading  = signal(false);
  errorMsg = signal<string | null>(null);

  showLoginPwd = signal(false);
  showRegPwd   = signal(false);

  rememberMe = false;
  loginData: LoginRequest     = { email: '', password: '' };
  registerData: RegisterRequest = { fullName: '', email: '', phone: '', password: '' };

  closed = output<void>();

  ngOnInit(): void {}

  open(tab: Tab = 'login'): void {
    this.tab.set(tab);
    this.errorMsg.set(null);
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
    this.closed.emit();
    this.reset();
  }

  onBackdrop(): void { this.close(); }

  setTab(tab: Tab): void {
    this.tab.set(tab);
    this.errorMsg.set(null);
  }

  async onLogin(): Promise<void> {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMsg.set('Please enter your email and password.');
      return;
    }
    this.loading.set(true);
    this.errorMsg.set(null);
    try {
      await this.authService.login(this.loginData, this.rememberMe);
      this.close();
    } catch (err: any) {
      this.errorMsg.set(err?.error?.error || 'Invalid email or password.');
    } finally {
      this.loading.set(false);
    }
  }

  async onRegister(): Promise<void> {
    if (!this.registerData.fullName || !this.registerData.email || !this.registerData.password) {
      this.errorMsg.set('Please fill in all required fields.');
      return;
    }
    if (this.registerData.password.length < 6) {
      this.errorMsg.set('Password must be at least 6 characters.');
      return;
    }
    this.loading.set(true);
    this.errorMsg.set(null);
    try {
      await this.authService.register(this.registerData);
      this.close();
    } catch (err: any) {
      this.errorMsg.set(err?.error?.error || 'Registration failed. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }

  private reset(): void {
    this.loginData    = { email: '', password: '' };
    this.registerData = { fullName: '', email: '', phone: '', password: '' };
    this.rememberMe   = false;
    this.showLoginPwd.set(false);
    this.showRegPwd.set(false);
  }
}
