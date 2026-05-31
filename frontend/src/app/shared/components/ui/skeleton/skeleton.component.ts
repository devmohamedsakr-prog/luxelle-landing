import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

type SkeletonVariant = 'text' | 'title' | 'avatar' | 'card' | 'button' | 'image' | 'input';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="classes()" [style.width]="width()" [style.height]="customHeight()"></div>
  `,
})
export class SkeletonComponent {
  variant = input<SkeletonVariant>('text');
  width = input<string>('');
  customHeight = input<string>('');
  rounded = input(false);

  classes = computed(() => {
    const base = 'shimmer-bg animate-shimmer';
    const shapes: Record<SkeletonVariant, string> = {
      text:   'h-4 rounded-lg w-full',
      title:  'h-7 rounded-xl w-3/4',
      avatar: 'w-12 h-12 rounded-full',
      card:   'h-48 rounded-2xl w-full',
      button: 'h-11 rounded-2xl w-32',
      image:  'aspect-square rounded-2xl w-full',
      input:  'h-12 rounded-2xl w-full',
    };
    const extra = this.rounded() ? '!rounded-full' : '';
    return `${base} ${shapes[this.variant()]} ${extra}`;
  });
}
