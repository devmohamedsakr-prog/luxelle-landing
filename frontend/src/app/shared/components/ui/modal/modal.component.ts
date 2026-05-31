import { Component, input, output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { trigger, style, animate, transition } from '@angular/animations';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './modal.component.html',
  animations: [
    trigger('backdrop', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease', style({ opacity: 0 })),
      ]),
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
})
export class ModalComponent {
  isOpen    = input(false);
  title     = input('');
  size      = input<ModalSize>('md');
  closeable = input(true);
  closed    = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void { if (this.closeable()) this.closed.emit(); }

  sizeClass(): string {
    return { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' }[this.size()];
  }

  onBackdropClick(): void { if (this.closeable()) this.closed.emit(); }
}
