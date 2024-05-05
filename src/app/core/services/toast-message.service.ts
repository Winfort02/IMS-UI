import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private _messageService: MessageService) {}

  showSuccessToast(
    content: string,
    key: string,
    summary: string = '',
    icon: string = 'none'
  ): void {
    this._messageService.add({
      severity: 'custom',
      summary: summary,
      detail: content,
      key,
      icon,
      styleClass: 'border-y-2 border-teal-800',
      contentStyleClass: 'text-white bg-teal-800',
    });
  }

  showErrorToast(
    content: string,
    key: string,
    summary: string = '',
    icon: string = 'none'
  ): void {
    this._messageService.add({
      severity: 'custom',
      summary: summary,
      detail: content,
      key,
      icon,
      styleClass: 'border-y-2 border-red-700',
      contentStyleClass: 'text-white bg-red-700',
    });
  }
}
