import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { fadeInUp } from '../../shared/animations/animations';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonComponent, LucideAngularModule],
  templateUrl: './hero.component.html',
  animations: [fadeInUp],
})
export class HeroComponent {
  scrollToServices(): void {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToBooking(): void {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  }
}
