import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { catchError } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { API_ENPOINTS } from '../constant/api-endpoints.constant';
import { UserModel } from '../models/user.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private _coreService: CoreService,
    private _commonService: CommonService,
    private _spinner: NgxSpinnerService
  ) {}

  getAllUser(page: number = 1, pageSize: number = 20, keywords: string = '') {
    return this._coreService
      .httpGet(
        `${API_ENPOINTS.USERS.base}?page=${page}&size=${pageSize}&keywords=${keywords}`
      )
      .pipe(
        take(1),
        map((response: any) => {
          const users = response.data.meta;
          const data = users.map((item: any) => ({
            id: item.id,
            name: item.name,
            username: item.username,
            userType: item.userType ? 'Admin' : 'User',
            email: item.email,
            createdAt: this._commonService.dateFormmater(
              item.createdAt as Date
            ),
          }));
          return {
            currentPage: response.data.currentPage,
            nextPage: response.data.nextPage,
            prevPage: response.data.prevPage,
            lastPage: response.data.totalPages,
            totalPages: response.data.totalPages,
            firstPage: 1,
            metaData: data,
            pageDetails: `${response.data.currentPage} / ${response.data.totalPages}`,
          };
        }),
        catchError((error) => this._coreService.httpError(error))
      );
  }

  getAllArchiveUsers(page: number = 1, pageSize: number = 20) {
    return this._coreService
      .httpGet(`${API_ENPOINTS.USERS.archieve}?page=${page}&size=${pageSize}`)
      .pipe(
        take(1),
        map((response: any) => {
          const users = response.data.meta;
          const data = users.map((item: any) => ({
            id: item.id,
            name: item.name,
            username: item.username,
            userType: item.userType ? 'Admin' : 'User',
            email: item.email,
            deletedAt: this._commonService.dateFormmater(
              item.deletedAt as Date
            ),
          }));
          return {
            currentPage: response.data.currentPage,
            nextPage: response.data.nextPage,
            prevPage: response.data.prevPage,
            lastPage: response.data.totalPages,
            totalPages: response.data.totalPages,
            firstPage: 1,
            metaData: data,
            pageDetails: `${response.data.currentPage} / ${response.data.totalPages}`,
          };
        }),
        catchError((error) => this._coreService.httpError(error))
      );
  }

  createUser(requestBody: UserModel) {
    this._spinner.show();
    return this._coreService
      .httpPost(API_ENPOINTS.USERS.base, requestBody)
      .pipe(
        take(1),
        finalize(() => {
          this._spinner.hide();
        }),
        catchError((error) => this._coreService.httpError(error))
      );
  }

  updateUser(requestBody: UserModel) {
    this._spinner.show();
    return this._coreService
      .httpPut(`${API_ENPOINTS.USERS.base}/${requestBody.id}`, requestBody)
      .pipe(
        take(1),
        finalize(() => {
          this._spinner.hide();
        }),
        catchError((error) => this._coreService.httpError(error))
      );
  }

  deleteUser(id: string) {
    this._spinner.show();
    return this._coreService
      .httpDelete(`${API_ENPOINTS.USERS.base}/${id}`)
      .pipe(
        take(1),
        finalize(() => {
          this._spinner.hide();
        }),
        catchError((error) => this._coreService.httpError(error))
      );
  }

  removeUser(id: string) {
    this._spinner.show();
    return this._coreService
      .httpDelete(`${API_ENPOINTS.USERS.remove}/${id}`)
      .pipe(
        take(1),
        finalize(() => {
          this._spinner.hide();
        }),
        catchError((error) => this._coreService.httpError(error))
      );
  }

  restoreUser(user: UserModel) {
    this._spinner.show();
    return this._coreService
      .httpPatch(`${API_ENPOINTS.USERS.restore}/${user.id}`, user)
      .pipe(
        take(1),
        finalize(() => {
          this._spinner.hide();
        }),
        catchError((error) => this._coreService.httpError(error))
      );
  }
}
