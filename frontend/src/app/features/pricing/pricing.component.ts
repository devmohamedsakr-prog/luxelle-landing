import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { ApiDataService, ApiPricingTier } from '../../core/services/api-data.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-pricing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ScrollRevealDirective, ButtonComponent, LucideAngularModule],
  templateUrl: './pricing.component.html',
})
export class PricingComponent {
  private apiData = inject(ApiDataService);

  pricingTiers = this.apiData.pricingTiers;
  isLoading    = this.apiData.pricingLoading;
  hasError     = this.apiData.pricingError;
  skeletons    = Array(4).fill(0);

  trackById(_: number, tier: ApiPricingTier): number {
    return tier.id;
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByFeature(_: number, feature: string): string {
    return feature;
  }

  scrollToBooking(): void {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  }
}
