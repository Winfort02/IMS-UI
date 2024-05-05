import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class ApplicationGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const { userType } = route.data;
    if (this._authenticationService.isLogin()) {
      return true;
    }
    this._router.navigate(['/security/login']);
    return false;
  }
}
