import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { DatePickerComponent } from '../../shared/components/ui/date-picker/date-picker.component';
import { SelectComponent, SelectOption } from '../../shared/components/ui/select/select.component';
import { NotificationService } from '../../core/services/notification.service';
import { ConfirmationModalService } from '../../shared/services/confirmation-modal.service';
import { ApiDataService } from '../../core/services/api-data.service';
import { environment } from '../../../environments/environment';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-booking',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ScrollRevealDirective,
    CardComponent,
    ButtonComponent,
    DatePickerComponent,
    SelectComponent,
    LucideAngularModule,
  ],
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit {
  private fb           = inject(FormBuilder);
  private http         = inject(HttpClient);
  private notify       = inject(NotificationService);
  private confirmModal = inject(ConfirmationModalService);
  private apiData      = inject(ApiDataService);

  bookingForm!: FormGroup;
  isSubmitting = signal(false);
  bookingRef   = signal<string | null>(null);

  serviceOptions = computed<SelectOption[]>(() =>
    this.apiData.services().map(s => ({
      value: String(s.id),
      label: `${s.name} — $${s.price}`,
    }))
  );

  timeOptions: SelectOption[] = [
    { value: '09:00', label: '9:00 AM'  },
    { value: '09:30', label: '9:30 AM'  },
    { value: '10:00', label: '10:00 AM' },
    { value: '10:30', label: '10:30 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '11:30', label: '11:30 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '12:30', label: '12:30 PM' },
    { value: '13:00', label: '1:00 PM'  },
    { value: '13:30', label: '1:30 PM'  },
    { value: '14:00', label: '2:00 PM'  },
    { value: '14:30', label: '2:30 PM'  },
    { value: '15:00', label: '3:00 PM'  },
    { value: '15:30', label: '3:30 PM'  },
    { value: '16:00', label: '4:00 PM'  },
    { value: '16:30', label: '4:30 PM'  },
    { value: '17:00', label: '5:00 PM'  },
  ];

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      fullName:      ['', [Validators.required, Validators.minLength(2)]],
      email:         ['', [Validators.required, Validators.email]],
      phone:         ['', [Validators.required, Validators.pattern(/^[\d\s\-\+\(\)]{7,}$/)]],
      serviceType:   ['', Validators.required],
      preferredDate: ['', Validators.required],
      preferredTime: ['', Validators.required],
      notes:         [''],
    });
  }

  private buildAppointmentDate(date: Date, time: string): string {
    const d = new Date(date);
    const [h, m] = time.split(':').map(Number);
    d.setHours(h, m, 0, 0);
    return d.toISOString();
  }

  async onSubmit(): Promise<void> {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      this.notify.error('Please fill in all required fields');
      return;
    }

    const confirmed = await this.confirmModal.confirm({
      title:       'Confirm Appointment',
      message:     'Ready to book your appointment? We will reach out shortly to confirm the details.',
      confirmText: 'Book Now',
      cancelText:  'Review',
      variant:     'info',
    });
    if (!confirmed) return;

    this.isSubmitting.set(true);
    this.bookingRef.set(null);

    const v = this.bookingForm.value;
    const payload = {
      fullName:        v.fullName,
      email:           v.email,
      phone:           v.phone,
      serviceId:       parseInt(v.serviceType, 10),
      appointmentDate: this.buildAppointmentDate(new Date(v.preferredDate), v.preferredTime),
      notes:           v.notes || null,
    };

    try {
      const res = await this.http
        .post<{ id: number }>(`${environment.apiUrl}/bookings/guest`, payload)
        .toPromise();
      const ref = `LX-${String(res?.id ?? 0).padStart(5, '0')}`;
      this.bookingRef.set(ref);
      this.notify.success(`Appointment confirmed! Ref: ${ref} ✨`);
      this.bookingForm.reset();
    } catch (err: any) {
      console.error('Booking error:', err);
      this.notify.error(err?.error?.message || 'Could not save booking. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
