import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserModel } from '../../models/user.model';

@Component({
  standalone: true,
  selector: 'app-common-header',
  imports: [CommonModule, InputTextModule, ButtonModule, ReactiveFormsModule],
  template: `<div class="flex col-12">
    <form [formGroup]="userForm" (ngSubmit)="onSubmitForm()" class="w-full">
      <div class="col-12">
        <input type="text" pInputText formControlName="id" hidden />
      </div>
      <div class="col-12">
        <div class="pb-1">Full Name</div>
        <input
          type="text"
          pInputText
          class="p-input-text-lg outline-none w-full"
          formControlName="name"
        />
      </div>
      <div class="col-12">
        <div class="pb-1">Username</div>
        <input
          type="text"
          pInputText
          class="p-input-text-lg outline-none w-full"
          formControlName="username"
        />
      </div>
      <div class="col-12">
        <div class="pb-1">User Type</div>
        <input
          type="text"
          pInputText
          class="p-input-text-lg outline-none w-full"
          formControlName="userType"
        />
      </div>
      <div class="col-12">
        <div class="pb-1">Email</div>
        <input
          type="text"
          pInputText
          class="p-input-text-lg outline-none w-full"
          formControlName="email"
        />
      </div>
      <div class="col-12" *ngIf="!isEditMode">
        <div class="pb-1">Password</div>
        <input
          type="password"
          pInputText
          class="p-input-text-lg outline-none w-full"
          formControlName="password"
        />
      </div>
      <div class="col-12" *ngIf="!isEditMode">
        <div class="pb-1">Password</div>
        <input
          type="password"
          pInputText
          class="p-input-text-lg outline-none w-full"
          formControlName="confirmPassword"
        />
      </div>
      <div class="col-12">
        <button
          pButton
          type="submit"
          label="Save"
          class="p-button-raised p-button-primary p-button-md w-full outline-none"
          [disabled]="userForm.invalid"
        ></button>
      </div>
    </form>
  </div>`,
})
export class UserDetailComponent implements OnInit {
  userForm!: FormGroup;
  user: UserModel = new UserModel();
  isEditMode: boolean = false;

  constructor(
    private _dialogConfig: DynamicDialogConfig,
    private _dialogRef: DynamicDialogRef,
    private _formBuilder: FormBuilder
  ) {}

  onLoadUserDetails() {
    this.user = this._dialogConfig.data.user;
    this.isEditMode = this._dialogConfig.data.type;
    if (this.isEditMode) {
      this.userForm = this._formBuilder.group({
        id: [this.user.id],
        name: [this.user.name, [Validators.required]],
        username: [this.user.username, [Validators.required]],
        userType: [this.user.userType ? 'Admin' : 'User'],
        email: [this.user.email, [Validators.required, Validators.email]],
      });
    } else {
      this.userForm = this._formBuilder.group({
        id: [null],
        name: [this.user.name, [Validators.required]],
        username: [this.user.username, [Validators.required]],
        userType: [this.user.userType ? 'Admin' : 'User'],
        email: [this.user.email, [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      });
    }
    this.userForm.controls['userType'].disable();
  }

  onSubmitForm() {
    if (this.userForm.invalid) return;
    this.userForm.value.userType = this.user.userType;
    this._dialogRef.close(this.userForm.value);
    this.userForm.reset();
  }

  ngOnInit(): void {
    this.onLoadUserDetails();
  }
}
