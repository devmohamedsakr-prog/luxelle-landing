import { Injectable, signal } from '@angular/core';

export interface ConfirmationConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ConfirmationModalService {
  private _config  = signal<ConfirmationConfig | null>(null);
  private _resolve: ((confirmed: boolean) => void) | null = null;

  readonly config  = this._config.asReadonly();
  readonly isOpen  = signal(false);

  confirm(config: ConfirmationConfig): Promise<boolean> {
    this._config.set({ confirmText: 'Confirm', cancelText: 'Cancel', variant: 'danger', ...config });
    this.isOpen.set(true);
    return new Promise(resolve => { this._resolve = resolve; });
  }

  resolve(confirmed: boolean): void {
    this.isOpen.set(false);
    setTimeout(() => this._config.set(null), 300);
    if (this._resolve) {
      this._resolve(confirmed);
      this._resolve = null;
    }
  }
}
