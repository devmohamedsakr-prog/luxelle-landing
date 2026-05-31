import {
  Component, input, signal, computed, forwardRef,
  HostListener, ElementRef, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isPast: boolean;
}

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  label        = input('');
  placeholder  = input('Pick a date...');
  minDate      = input<Date | null>(null);
  disabled     = input(false);

  private el = inject(ElementRef);

  isOpen       = signal(false);
  viewDate     = signal(new Date());
  selectedDate = signal<Date | null>(null);
  isTouched    = signal(false);

  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  readonly DAYS  = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  readonly today = new Date();

  displayValue = computed(() => {
    const d = this.selectedDate();
    if (!d) return '';
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  });

  monthLabel = computed(() =>
    this.viewDate().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  );

  calendarDays = computed((): CalendarDay[] => {
    const vd    = this.viewDate();
    const year  = vd.getFullYear();
    const month = vd.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days: CalendarDay[] = [];
    const todayStr = this.dateKey(this.today);
    const selectedStr = this.selectedDate() ? this.dateKey(this.selectedDate()!) : '';

    // Prev month filler
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      days.push({ date: d, isCurrentMonth: false, isToday: false, isSelected: false, isPast: this.isPast(d) });
    }
    // Current month
    for (let d = 1; d <= lastDate; d++) {
      const date = new Date(year, month, d);
      days.push({
        date,
        isCurrentMonth: true,
        isToday:   this.dateKey(date) === todayStr,
        isSelected: this.dateKey(date) === selectedStr,
        isPast: this.isPast(date),
      });
    }
    // Next month filler (fill to 6 rows = 42 cells)
    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const date = new Date(year, month + 1, d);
      days.push({ date, isCurrentMonth: false, isToday: false, isSelected: false, isPast: this.isPast(date) });
    }
    return days;
  });

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (!this.el.nativeElement.contains(e.target)) {
      this.isOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void { this.isOpen.set(false); }

  toggleOpen(): void {
    if (this.disabled()) return;
    this.isOpen.update(v => !v);
    if (this.selectedDate()) this.viewDate.set(new Date(this.selectedDate()!));
    if (!this.isTouched()) { this.isTouched.set(true); this.onTouched(); }
  }

  prevMonth(): void {
    const d = new Date(this.viewDate());
    d.setMonth(d.getMonth() - 1);
    this.viewDate.set(d);
  }

  nextMonth(): void {
    const d = new Date(this.viewDate());
    d.setMonth(d.getMonth() + 1);
    this.viewDate.set(d);
  }

  selectDay(day: CalendarDay): void {
    if (day.isPast && !day.isToday) return;
    this.selectedDate.set(day.date);
    // Emit as YYYY-MM-DD string (matches date input format)
    const y = day.date.getFullYear();
    const m = String(day.date.getMonth() + 1).padStart(2, '0');
    const d = String(day.date.getDate()).padStart(2, '0');
    this.onChange(`${y}-${m}-${d}`);
    this.isOpen.set(false);
  }

  private dateKey(d: Date): string {
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  }

  private isPast(d: Date): boolean {
    const min = this.minDate();
    if (min) return d < min;
    const t = new Date(this.today);
    t.setHours(0, 0, 0, 0);
    const dc = new Date(d);
    dc.setHours(0, 0, 0, 0);
    return dc < t;
  }

  writeValue(v: string): void {
    if (v) {
      const d = new Date(v + 'T00:00:00');
      this.selectedDate.set(d);
      this.viewDate.set(new Date(d));
    } else {
      this.selectedDate.set(null);
    }
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void {}
}
