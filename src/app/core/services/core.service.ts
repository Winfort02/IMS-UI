import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { httpAuthorizationHeader } from '../helpers/common-header.helper';
import { CommonService } from 'src/app/shared/services/common.service';
import { ToastMessageService } from './toast-message.service';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private accessTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private _commonService: CommonService,
    private _httpClient: HttpClient,
    private _toastService: ToastMessageService
  ) {}

  getAccessToken(): string | null {
    const token = this.getLocalStorageItem('token');
    if (token) {
      this.accessTokenSubject.next(token);
      this.accessTokenSubject.complete();
    }
    return token || this.accessTokenSubject.value;
  }

  setAccessToken(token: string | null) {
    this.accessTokenSubject.next(token);
    this.accessTokenSubject.complete();
  }

  getLocalStorageItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  httpPost(url: string, requestBody: object) {
    return this._httpClient.post(
      `${environment.apiUrl}/${url}`,
      requestBody,
      httpAuthorizationHeader(this.getAccessToken(), ['application/json'])
    );
  }

  httpGet(url: string) {
    return this._httpClient.get(
      `${environment.apiUrl}/${url}`,
      httpAuthorizationHeader(this.getAccessToken(), ['application/json'])
    );
  }

  httpPut(url: string, requestBody: object) {
    return this._httpClient.put(
      `${environment.apiUrl}/${url}`,
      requestBody,
      httpAuthorizationHeader(this.getAccessToken(), ['application/json'])
    );
  }

  httpPatch(url: string, data: object) {
    return this._httpClient.patch(
      `${environment.apiUrl}/${url}`,
      data,
      httpAuthorizationHeader(this.getAccessToken(), ['application/json'])
    );
  }

  httpDelete(url: string) {
    return this._httpClient.delete(
      `${environment.apiUrl}/${url}`,
      httpAuthorizationHeader(this.getAccessToken(), ['application/json'])
    );
  }

  httpError(errors: HttpErrorResponse) {
    const { error } = errors;
    if (errors.status == 403 || errors.status === 401) {
      this._commonService.sessionExpire();
      return throwError(error);
    }
    const httpError = {
      ...error,
      httpError: {
        message: errors.message,
        name: errors.name,
        ok: errors.ok,
        status: errors.status,
        statusText: errors.statusText,
        url: errors.url,
      },
    };
    this._toastService.showErrorToast(
      error.errors?.errors[0]?.message || error.message,
      'tr-global-toast'
    );
    return throwError(httpError);
  }
}
