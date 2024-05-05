import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this._authenticationService.isLogin()) {
      this._router.navigate(['/application']);
      return false;
    }
    return true;
  }
}
