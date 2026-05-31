import {
  Component, input, signal, computed, forwardRef,
  HostListener, ElementRef, inject, effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  options  = input<SelectOption[]>([]);
  placeholder = input('Select an option...');
  label    = input('');
  error    = input('');
  disabled = input(false);

  private el = inject(ElementRef);

  isOpen    = signal(false);
  value     = signal<string | number | null>(null);
  isTouched = signal(false);

  selectedLabel = computed(() => {
    const v = this.value();
    if (v === null || v === '' || v === undefined) return '';
    return this.options().find(o => o.value === v)?.label ?? '';
  });

  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

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
    if (!this.isTouched()) {
      this.isTouched.set(true);
      this.onTouched();
    }
  }

  select(opt: SelectOption): void {
    if (opt.disabled) return;
    this.value.set(opt.value);
    this.onChange(opt.value);
    this.isOpen.set(false);
  }

  writeValue(v: any): void { this.value.set(v ?? null); }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void {}
}
