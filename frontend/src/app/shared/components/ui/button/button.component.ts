import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  host: {
    '[class.block]': 'fullWidth()',
    '[class.w-full]': 'fullWidth()',
  },
})
export class ButtonComponent {
  variant   = input<ButtonVariant>('primary');
  size      = input<ButtonSize>('md');
  disabled  = input(false);
  type      = input<'button' | 'submit' | 'reset'>('button');
  fullWidth = input(false);
  onClick   = output<void>();

  getButtonClasses(): string {
    const base = [
      'inline-flex items-center justify-center gap-2',
      'font-semibold rounded-2xl',
      'transition-all duration-300',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold/60 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    ].join(' ');

    const sizes: Record<ButtonSize, string> = {
      sm: 'px-5 py-2.5 text-sm',
      md: 'px-7 py-3 text-[0.9375rem]',
      lg: 'px-9 py-4 text-base',
    };

    const variants: Record<ButtonVariant, string> = {
      primary: [
        'bg-gradient-to-br from-rose-gold to-[#e09caa]',
        'text-luxelle-dark shadow-luxelle-glow',
        'hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(232,180,188,0.45)]',
        'active:scale-[0.97] active:translate-y-0',
      ].join(' '),

      outline: [
        'border-2 border-rose-gold text-rose-gold',
        'hover:bg-rose-gold/10 hover:-translate-y-0.5',
        'hover:shadow-[0_4px_20px_rgba(232,180,188,0.2)]',
        'active:scale-[0.97]',
      ].join(' '),

      ghost: [
        'text-rose-gold',
        'hover:bg-rose-gold/10 hover:scale-105',
        'active:scale-95',
      ].join(' '),
    };

    const width = this.fullWidth() ? ' w-full' : '';

    return `${base} ${sizes[this.size()]} ${variants[this.variant()]}${width}`;
  }
}
