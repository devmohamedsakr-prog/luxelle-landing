import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastr = inject(ToastrService);

  success(message: string, title?: string): void {
    this.toastr.success(message, title || 'Success', {
      timeOut: 4000,
      positionClass: 'toast-top-right',
      progressBar: true,
    });
  }

  error(message: string, title?: string): void {
    this.toastr.error(message, title || 'Error', {
      timeOut: 4000,
      positionClass: 'toast-top-right',
      progressBar: true,
    });
  }

  info(message: string, title?: string): void {
    this.toastr.info(message, title || 'Info', {
      timeOut: 4000,
      positionClass: 'toast-top-right',
      progressBar: true,
    });
  }

  warning(message: string, title?: string): void {
    this.toastr.warning(message, title || 'Warning', {
      timeOut: 4000,
      positionClass: 'toast-top-right',
      progressBar: true,
    });
  }
}
