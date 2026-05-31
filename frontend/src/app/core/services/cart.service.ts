import { Injectable, computed, signal } from '@angular/core';

export interface CartItem {
  serviceId: string;
  name: string;
  icon: string;
  price: number;
  duration: number;
  quantity: number;
}

export interface CheckoutData {
  name: string;
  email: string;
  phone: string;
  date: Date | null;
  time: string;
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  items          = signal<CartItem[]>([]);
  isOpen         = signal(false);
  step           = signal<1 | 2 | 3>(1);
  bookingRef     = signal('');
  checkoutData   = signal<CheckoutData | null>(null);

  totalItems = computed(() => this.items().reduce((s, i) => s + i.quantity, 0));
  subtotal   = computed(() => this.items().reduce((s, i) => s + i.price * i.quantity, 0));
  totalMins  = computed(() => this.items().reduce((s, i) => s + i.duration * i.quantity, 0));

  addItem(service: { id: string; name: string; icon: string; price: number; duration: number }): void {
    const found = this.items().find(i => i.serviceId === service.id);
    if (found) {
      this.items.update(list =>
        list.map(i => i.serviceId === service.id ? { ...i, quantity: i.quantity + 1 } : i)
      );
    } else {
      this.items.update(list => [
        ...list,
        { serviceId: service.id, name: service.name, icon: service.icon, price: service.price, duration: service.duration, quantity: 1 },
      ]);
    }
    this.open();
  }

  removeItem(serviceId: string): void {
    this.items.update(list => list.filter(i => i.serviceId !== serviceId));
  }

  updateQty(serviceId: string, delta: number): void {
    this.items.update(list =>
      list
        .map(i => i.serviceId === serviceId ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0)
    );
  }

  open(): void  { this.isOpen.set(true); }
  close(): void { this.isOpen.set(false); }

  toCheckout(): void { this.step.set(2); }
  toCart(): void     { this.step.set(1); }

  confirm(data: CheckoutData): void {
    this.checkoutData.set(data);
    this.bookingRef.set('LXL-' + Math.random().toString(36).substring(2, 8).toUpperCase());
    this.step.set(3);
  }

  bookAnother(): void {
    this.items.set([]);
    this.checkoutData.set(null);
    this.bookingRef.set('');
    this.step.set(1);
  }
}
