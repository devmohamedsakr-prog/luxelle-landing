import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ScrollRevealDirective, CardComponent, ButtonComponent, LucideAngularModule],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  showStory = signal(false);

  openStory() {
    this.showStory.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeStory() {
    this.showStory.set(false);
    document.body.style.overflow = '';
  }

  timeline = [
    { year: '2016', title: 'Founded',      desc: 'Elena and Sophia Varela opened Luxelle with a single treatment room and a vision to redefine luxury beauty in the city.' },
    { year: '2018', title: 'Expansion',    desc: 'Growing demand led to a full 8-room wellness center, adding massage therapy, nail artistry, and our signature spa rituals.' },
    { year: '2020', title: 'Award-Winning',desc: 'Recognized as "Best Beauty & Wellness Studio" by the City Lifestyle Awards — shaped entirely by our clients\' loyalty.' },
    { year: '2025', title: '500+ Clients', desc: 'Over 500 loyal clients and counting, with a team of 14 certified specialists delivering 3,000+ treatments per year.' },
  ];

  values = [
    { icon: 'sparkles', title: 'Elegance in Everything', desc: 'From the first greeting to the final touch, every detail is crafted with intention and care.' },
    { icon: 'heart',    title: 'Genuine Connection',     desc: 'We take the time to understand you — your skin, your style, your story — before we begin.' },
    { icon: 'award',    title: 'Certified Excellence',   desc: 'Our team holds advanced certifications and attends ongoing training to stay at the forefront of beauty science.' },
  ];
}
