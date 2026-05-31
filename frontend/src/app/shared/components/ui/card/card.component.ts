import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
})
export class CardComponent {
  hoverable = input(true);
  glass = input(false);
  featured = input(false);

  getCardClasses(): string {
    const base = 'rounded-2xl p-6 transition-all duration-[350ms] ease-spring';

    if (this.glass()) {
      return `${base} glass-card ${this.hoverable() ? 'hover:-translate-y-1.5 hover:shadow-luxelle-card-hover hover:border-luxelle-medium' : ''}`;
    }

    if (this.featured()) {
      return `${base} luxelle-card luxelle-card-featured`;
    }

    return `${base} luxelle-card ${this.hoverable() ? '' : '!transform-none !shadow-none'}`;
  }
}
