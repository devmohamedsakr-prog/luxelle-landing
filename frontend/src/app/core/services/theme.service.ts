import { Injectable, signal, effect } from '@angular/core';
import { Theme } from '../models/theme.model';
import { THEME_STORAGE_KEY, DEFAULT_THEME } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly theme$ = signal<Theme>(this.getInitialTheme());
  readonly isDark$ = signal(this.theme$() === 'dark');

  constructor() {
    // Sync theme changes to DOM and localStorage
    effect(() => {
      const theme = this.theme$();
      this.applyTheme(theme);
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    });
  }

  private getInitialTheme(): Theme {
    // Check localStorage first
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    return DEFAULT_THEME as Theme;
  }

  private applyTheme(theme: Theme): void {
    const html = document.documentElement;
    if (theme === 'light') {
      html.classList.add('light');
    } else {
      html.classList.remove('light');
    }
  }

  toggleTheme(): void {
    const newTheme = this.theme$() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme): void {
    this.theme$.set(theme);
    this.isDark$.set(theme === 'dark');
  }

  getTheme(): Theme {
    return this.theme$();
  }

  isDarkMode(): boolean {
    return this.isDark$();
  }
}
