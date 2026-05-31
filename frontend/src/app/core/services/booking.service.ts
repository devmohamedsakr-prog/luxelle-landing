import { Injectable, signal } from '@angular/core';
import { Booking, BookingResponse } from '../models/booking.model';
import { SERVICES } from '../constants/app.constants';

export interface ValidationError {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookings$ = signal<Booking[]>([]);
  formData = signal<Partial<Booking>>({});
  validationErrors = signal<ValidationError>({});
  isSubmitting = signal(false);

  constructor() {
    this.loadBookings();
  }

  private loadBookings(): void {
    const stored = localStorage.getItem('luxelle-bookings');
    if (stored) {
      this.bookings$.set(JSON.parse(stored));
    }
  }

  private saveBookings(): void {
    localStorage.setItem('luxelle-bookings', JSON.stringify(this.bookings$()));
  }

  updateField(field: keyof Booking, value: any): void {
    this.formData.update(data => ({ ...data, [field]: value }));
    // Clear error for this field when user corrects it
    this.validationErrors.update(errors => {
      const newErrors = { ...errors };
      delete newErrors[field];
      return newErrors;
    });
  }

  validateForm(booking: Partial<Booking>): ValidationError {
    const errors: ValidationError = {};

    // Full Name validation
    if (!booking.fullName || booking.fullName.trim() === '') {
      errors['fullName'] = 'Full Name is required';
    } else if (booking.fullName.trim().length < 2) {
      errors['fullName'] = 'Full Name must be at least 2 characters';
    }

    // Phone Number validation
    if (!booking.phone || booking.phone.trim() === '') {
      errors['phone'] = 'Phone Number is required';
    } else if (!this.isValidPhoneNumber(booking.phone)) {
      errors['phone'] = 'Phone Number must be a valid format';
    }

    // Email validation
    if (!booking.email || booking.email.trim() === '') {
      errors['email'] = 'Email is required';
    } else if (!this.isValidEmail(booking.email)) {
      errors['email'] = 'Email must be a valid email address';
    }

    // Preferred Date validation
    if (!booking.preferredDate) {
      errors['preferredDate'] = 'Preferred Date is required';
    } else if (this.isPastDate(booking.preferredDate)) {
      errors['preferredDate'] = 'Preferred Date must be in the future';
    }

    // Preferred Time validation
    if (!booking.preferredTime || booking.preferredTime.trim() === '') {
      errors['preferredTime'] = 'Preferred Time is required';
    }

    // Service Type validation
    if (!booking.serviceType || booking.serviceType.trim() === '') {
      errors['serviceType'] = 'Service Type is required';
    }

    return errors;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhoneNumber(phone: string): boolean {
    // Accept various phone formats
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  private isPastDate(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  }

  submitBooking(booking: Partial<Booking>): BookingResponse {
    try {
      const errors = this.validateForm(booking);
      this.validationErrors.set(errors);

      if (Object.keys(errors).length > 0) {
        return {
          success: false,
          message: 'Please fix the validation errors',
        };
      }

      this.isSubmitting.set(true);

      const newBooking: Booking = {
        ...booking,
        id: this.generateId(),
        createdAt: new Date(),
        status: 'pending',
      } as Booking;

      const currentBookings = this.bookings$();
      this.bookings$.set([...currentBookings, newBooking]);
      this.saveBookings();

      this.clearForm();
      this.isSubmitting.set(false);

      return {
        success: true,
        message: 'Your appointment has been booked successfully',
        bookingId: newBooking.id,
      };
    } catch (error) {
      this.isSubmitting.set(false);
      return {
        success: false,
        message: 'Failed to submit booking. Please try again.',
      };
    }
  }

  clearForm(): void {
    this.formData.set({});
    this.validationErrors.set({});
  }

  getAvailableSlots(date: Date): string[] {
    // Mock available time slots
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  }

  getServices() {
    return SERVICES;
  }

  getBookings(): Booking[] {
    return this.bookings$();
  }

  private generateId(): string {
    return `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
