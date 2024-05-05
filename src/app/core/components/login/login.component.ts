import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { UserModel } from '../../models/user.model';
import { ToastMessageService } from '../../services/toast-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  user: UserModel = new UserModel();
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthenticationService,
    private _toastService: ToastMessageService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onSubmitLoginForm(): void {
    this._authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.user = this._authService.currentUser;
      },
      complete: () => {
        this.loginForm.reset();
        this._toastService.showSuccessToast(
          'Login Successfully',
          'tr-global-toast'
        );
        this._router.navigate(['application']);
      },
    });
  }
}
