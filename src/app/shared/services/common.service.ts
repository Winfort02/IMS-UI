import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private _datePipe: DatePipe,
    private _confirmationService: ConfirmationService
  ) {}

  dateFormmater(date: string | Date) {
    const selectedDate = new Date(date);
    return this._datePipe.transform(selectedDate, 'EEEE, dd yyyy H:mm a');
  }

  sessionExpire() {
    this._confirmationService.confirm({
      message: 'Your current session was expired. Please login again !',
      header: 'Session Expired',
      icon: 'pi pi-info-circle',
      acceptIcon: 'none',
      acceptLabel: 'Login',
      rejectVisible: false,
      accept: () => {
        localStorage.clear();
        location.reload();
      },
      reject: () => {
        localStorage.clear();
        location.reload();
      },
    });
  }
}
