import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { API_ENPOINTS } from '../constant/api-endpoints.constant';
import { UserModel } from '../models/user.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private _coreService: CoreService,
    private _spinner: NgxSpinnerService
  ) {}

  private userSubject = new BehaviorSubject<UserModel>(
    this.getUserFromLocalStorage()
  );
  public _user$!: Observable<UserModel>;

  public get currentUser(): UserModel {
    return this.userSubject.value;
  }

  private setUserToLocalStorage(user: UserModel) {
    localStorage.setItem('user_details', JSON.stringify(user));
  }

  private getUserFromLocalStorage(): UserModel {
    const user = localStorage.getItem('user_details');
    if (user) {
      return JSON.parse(user) as UserModel;
    }
    return new UserModel();
  }

  isLogin(): boolean {
    return !!localStorage.getItem('token');
  }

  login(data: object): Observable<object> {
    this._spinner.show();
    return this._coreService.httpPost(API_ENPOINTS.LOGIN, data).pipe(
      tap({
        next: async (response: any) => {
          const result = await response.data;
          localStorage.setItem('token', result.token);
          this.setUserToLocalStorage(result.user);
          this.userSubject.next(result.user);
          this.userSubject.complete();
          this._coreService.setAccessToken(result.token);
        },
      }),
      finalize(() => {
        this._spinner.hide();
      }),
      catchError((error) => this._coreService.httpError(error))
    );
  }
}
