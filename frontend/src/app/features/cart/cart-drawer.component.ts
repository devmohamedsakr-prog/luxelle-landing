import { Component, inject, OnInit, OnDestroy, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { CartService } from '../../core/services/cart.service';
import { StripeService } from '../../core/services/stripe.service';
import { DatePickerComponent } from '../../shared/components/ui/date-picker/date-picker.component';
import { SelectComponent, SelectOption } from '../../shared/components/ui/select/select.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    DatePickerComponent,
    SelectComponent,
    ButtonComponent,
  ],
  templateUrl: './cart-drawer.component.html',
})
export class CartDrawerComponent implements OnInit, OnDestroy {
  cart = inject(CartService);
  private fb = inject(FormBuilder);
  private stripeService = inject(StripeService);
  private http = inject(HttpClient);

  isProcessing = false;
  paymentError: string | null = null;
  cardElementInitialized = false;

  timeSlots: SelectOption[] = [
    '9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM',
    '12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM',
    '3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM',
    '6:00 PM','6:30 PM',
  ].map(t => ({ value: t, label: t }));

  form = this.fb.group({
    name:  ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    date:  [null as Date | null, Validators.required],
    time:  ['', Validators.required],
    notes: [''],
  });

  constructor() {
    effect(() => {
      if (this.cart.step() === 2 && !this.cardElementInitialized) {
        setTimeout(() => {
          this.initializeCardElement().catch(err => {
            console.error('Card element initialization failed:', err);
            this.paymentError = 'Failed to load payment form. Please try again.';
          });
        }, 500);
      }
    });
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.stripeService.destroyCardElement();
  }

  trackByValue(_: number, opt: SelectOption): string | number {
    return opt.value;
  }

  private async initializeCardElement(): Promise<void> {
    try {
      await this.stripeService.initializeCardElement();
      this.cardElementInitialized = true;
    } catch (err) {
      console.error('Failed to initialize card element:', err);
      this.paymentError = 'Failed to load payment form. Please refresh and try again.';
    }
  }

  isInvalid(ctrl: string): boolean {
    const c = this.form.get(ctrl);
    return !!(c?.invalid && c?.touched);
  }

  getErrorMessage(ctrl: string): string {
    const c = this.form.get(ctrl);
    if (!c || !c.errors) return '';

    if (ctrl === 'name') {
      if (c.errors['required']) return 'Full name is required';
      if (c.errors['minlength']) return 'Name must be at least 2 characters';
    }
    if (ctrl === 'email') {
      if (c.errors['required']) return 'Email is required';
      if (c.errors['email']) return 'Please enter a valid email address';
    }
    if (ctrl === 'phone') {
      if (c.errors['required']) return 'Phone number is required';
    }
    if (ctrl === 'date') {
      if (c.errors['required']) return 'Please select a date';
    }
    if (ctrl === 'time') {
      if (c.errors['required']) return 'Please select a time';
    }
    return 'This field is invalid';
  }

  formatDate(d: Date | null | undefined): string {
    if (!d) return '—';
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    }).format(new Date(d));
  }

  private buildAppointmentDate(date: Date, timeSlot: string): string {
    const d = new Date(date);
    const match = timeSlot.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const meridiem = match[3].toUpperCase();
      if (meridiem === 'PM' && hours !== 12) hours += 12;
      if (meridiem === 'AM' && hours === 12) hours = 0;
      d.setHours(hours, minutes, 0, 0);
    }
    return d.toISOString();
  }

  async proceed(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    if (!this.cardElementInitialized) {
      try {
        await this.initializeCardElement();
      } catch (err) {
        console.error('Failed to initialize card element before payment:', err);
        this.paymentError = 'Payment form not ready. Please refresh and try again.';
        return;
      }
    }

    this.isProcessing = true;
    this.paymentError = null;

    try {
      const v = this.form.value;
      const bookingData = {
        name:  v.name!,
        email: v.email!,
        phone: v.phone!,
        date:  v.date ?? null,
        time:  v.time!,
        notes: v.notes ?? '',
      };

      const firstItem = this.cart.items()[0];
      const serviceId = firstItem?.serviceId ? parseInt(firstItem.serviceId, 10) : 1;

      const appointmentDate = bookingData.date
        ? this.buildAppointmentDate(bookingData.date, bookingData.time)
        : new Date().toISOString();

      const guestBookingRequest = {
        fullName: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        serviceId,
        appointmentDate,
        notes: bookingData.notes || null,
      };

      console.log('Creating guest booking:', guestBookingRequest);
      let bookingId = 0;
      try {
        const bookingResponse = await this.http
          .post<{ id: number }>(`${environment.apiUrl}/bookings/guest`, guestBookingRequest)
          .toPromise();
        bookingId = bookingResponse?.id ?? 0;
        console.log('Guest booking created, id:', bookingId);
      } catch (bookingErr) {
        console.warn('Could not create booking record, continuing with payment:', bookingErr);
      }

      const paymentRequest = {
        bookingId,
        serviceId,
        amount: this.cart.subtotal(),
        currency: 'usd',
        customerEmail: bookingData.email,
        customerName: bookingData.name,
      };

      console.log('Creating payment intent:', paymentRequest);
      const paymentResponse = await this.stripeService.createPaymentIntent(paymentRequest);
      console.log('Payment intent created:', paymentResponse);

      const confirmResult = await this.stripeService.confirmPayment(paymentResponse.clientSecret);
      console.log('Payment confirmation result:', confirmResult);

      if (confirmResult.error) {
        this.paymentError = confirmResult.error.message || 'Payment failed';
        this.isProcessing = false;
        return;
      }

      if (paymentResponse.paymentIntentId) {
        const statusResult = await this.stripeService.confirmPaymentStatus(paymentResponse.paymentIntentId);
        if (statusResult.success) {
          this.cart.confirm(bookingData);
        } else {
          this.paymentError = 'Payment verification failed';
          this.isProcessing = false;
        }
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      this.paymentError = err.message || 'An error occurred during payment';
      this.isProcessing = false;
    }
  }

  bookAnother(): void {
    this.form.reset();
    this.paymentError = null;
    this.cart.bookAnother();
  }
}
