import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface ApiService {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: string;
  price: number;
  durationMinutes: number;
  isAvailable: boolean;
}

export interface ApiPricingTier {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: string;
  isPopular: boolean;
  features: string[];
  displayOrder: number;
}

interface CacheEntry<T> {
  data: T;
  ts: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000;
const SERVICES_CACHE_KEY = 'luxelle-cache-services';
const PRICING_CACHE_KEY  = 'luxelle-cache-pricing';

@Injectable({ providedIn: 'root' })
export class ApiDataService {
  private http = inject(HttpClient);

  services        = signal<ApiService[]>([]);
  servicesLoading = signal(true);
  servicesError   = signal<string | null>(null);

  pricingTiers    = signal<ApiPricingTier[]>([]);
  pricingLoading  = signal(true);
  pricingError    = signal<string | null>(null);

  constructor() {
    this.loadServices();
    this.loadPricingTiers();
  }

  private readCache<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const entry = JSON.parse(raw) as CacheEntry<T>;
      if (Date.now() - entry.ts > CACHE_TTL_MS) {
        localStorage.removeItem(key);
        return null;
      }
      return entry.data;
    } catch {
      return null;
    }
  }

  private writeCache<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() } as CacheEntry<T>));
    } catch { }
  }

  private loadServices(): void {
    const cached = this.readCache<ApiService[]>(SERVICES_CACHE_KEY);
    if (cached) {
      this.services.set(cached);
      this.servicesLoading.set(false);
      return;
    }
    this.http.get<ApiService[]>(`${environment.apiUrl}/services/available`).subscribe({
      next: data => {
        this.services.set(data);
        this.writeCache(SERVICES_CACHE_KEY, data);
        this.servicesLoading.set(false);
      },
      error: () => {
        this.servicesError.set('Could not load services');
        this.servicesLoading.set(false);
      },
    });
  }

  private loadPricingTiers(): void {
    const cached = this.readCache<ApiPricingTier[]>(PRICING_CACHE_KEY);
    if (cached) {
      this.pricingTiers.set(cached);
      this.pricingLoading.set(false);
      return;
    }
    this.http.get<ApiPricingTier[]>(`${environment.apiUrl}/pricing`).subscribe({
      next: data => {
        this.pricingTiers.set(data);
        this.writeCache(PRICING_CACHE_KEY, data);
        this.pricingLoading.set(false);
      },
      error: () => {
        this.pricingError.set('Could not load pricing');
        this.pricingLoading.set(false);
      },
    });
  }

  reload(): void {
    localStorage.removeItem(SERVICES_CACHE_KEY);
    localStorage.removeItem(PRICING_CACHE_KEY);
    this.servicesLoading.set(true);
    this.pricingLoading.set(true);
    this.servicesError.set(null);
    this.pricingError.set(null);
    this.loadServices();
    this.loadPricingTiers();
  }
}
