import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private _datePipe: DatePipe,
    private _confirmationService: ConfirmationService
  ) {}

  private searchSubject = new Subject<string>();
  private destroy$: Subject<void> = new Subject<void>();

  dateFormmater(date: string | Date) {
    const selectedDate = new Date(date);
    return this._datePipe.transform(selectedDate, 'EEEE, dd yyyy H:mm a');
  }

  sessionExpire() {
    this._confirmationService.confirm({
      message: 'Your current session was expired. You need to sign in again !',
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

  onInitSearchSubject() {
    return this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    );
  }

  emitSearch(value: any): void {
    this.searchSubject.next(value);
  }

  onCloseSearchSubscription() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
