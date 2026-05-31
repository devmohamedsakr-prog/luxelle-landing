import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CartService } from '../../core/services/cart.service';
import { ApiDataService, ApiService } from '../../core/services/api-data.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-services',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ScrollRevealDirective, LucideAngularModule],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  private cartService = inject(CartService);
  private apiData     = inject(ApiDataService);

  services    = this.apiData.services;
  isLoading   = this.apiData.servicesLoading;
  hasError    = this.apiData.servicesError;
  skeletons   = Array(8).fill(0);
  addedIds    = signal<number[]>([]);

  trackById(_: number, item: ApiService): number {
    return item.id;
  }

  trackByIndex(index: number): number {
    return index;
  }

  isAdded(id: number): boolean {
    return this.addedIds().includes(id);
  }

  addToCart(service: ApiService): void {
    this.cartService.addItem({
      id:       String(service.id),
      name:     service.name,
      icon:     service.icon,
      price:    service.price,
      duration: service.durationMinutes,
    });
    this.addedIds.update(ids => [...ids, service.id]);
    setTimeout(() => {
      this.addedIds.update(ids => ids.filter(i => i !== service.id));
    }, 1600);
  }
}
