import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { ToastMessageService } from 'src/app/core/services/toast-message.service';
import { UserService } from 'src/app/core/services/user.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDetailComponent } from '../../standalone/user-detail.component';
import {
  CreateUserTableColumn,
  CreateUserActionButton,
} from 'src/app/core/helpers/table.helper';
import { ConfirmationService } from 'primeng/api';
import { PaginationModel } from 'src/app/core/models/pagination.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { Pagination } from 'src/app/core/enum/pagination.enum';
import { ActionButtonType } from 'src/app/core/enum/action-button.enum';
import { CONFIRMATION_MESSAGE } from 'src/app/core/constant/confirmation-message.constant';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  cols = CreateUserTableColumn();
  actionButton = CreateUserActionButton();
  isLoading: boolean = true;
  userSubscription!: Subscription;
  searchSubscription!: Subscription;
  users: UserModel[] = [];
  userModel: UserModel = new UserModel();
  dialogRef: DynamicDialogRef | undefined;
  pagination = new PaginationModel();
  pageSize: number | undefined;
  keywords: string = '';

  constructor(
    private _userService: UserService,
    private _toastService: ToastMessageService,
    private _dynamicDialogService: DialogService,
    private _confrimService: ConfirmationService,
    private _commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.searchSubscription = this._commonService
      .onInitSearchSubject()
      .subscribe((data) => {
        console.log(data);
        this.getAllusers(this.pagination.firstPage, this.pageSize);
      });
  }

  ngOnDestroy(): void {
    this._commonService.onCloseSearchSubscription();
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.searchSubscription) this.searchSubscription.unsubscribe();
  }

  search(event: any) {
    this.keywords = event;
    this._commonService.emitSearch(this.keywords);
  }

  onSelectPage(event: number) {
    this.getAllusers(event, this.pageSize);
  }

  onSelectRowSize(event: any) {
    this.pageSize = event.row;
    this.getAllusers(this.pagination.firstPage, this.pageSize);
  }

  onPaginate(event: string) {
    if (event === Pagination.first)
      this.getAllusers(this.pagination.firstPage, this.pageSize);
    if (event === Pagination.next)
      this.getAllusers(this.pagination.nextPage, this.pageSize);
    if (event === Pagination.prev)
      this.getAllusers(this.pagination.prevPage, this.pageSize);
    if (event === Pagination.last)
      this.getAllusers(this.pagination.lastPage, this.pageSize);
  }

  getAllusers(page: number, pageSize: number = 20) {
    this.isLoading = true;
    this.userSubscription = this._userService
      .getAllUser(page, pageSize, this.keywords)
      .subscribe({
        next: (response: PaginationModel) => {
          this.pagination = response;
          this.users = this.pagination.metaData;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  showUserDetailComponent(
    data: UserModel = new UserModel(),
    isEditMode: boolean = false
  ) {
    this.dialogRef = this._dynamicDialogService.open(UserDetailComponent, {
      header: 'USER DETAILS',
      style: {
        'min-width': '475px',
        width: '35%',
      },
      contentStyle: {
        overflow: 'auto',
        'min-width': '475px',
      },
      baseZIndex: 10000,
      maximizable: true,
      data: { user: data, type: isEditMode },
    });

    this.dialogRef.onClose.subscribe((response: UserModel) => {
      if (response) {
        if (response.id) this.updateUser(response);
        else this.createUser(response);
      }
    });
  }

  onClickActionButton(event: any) {
    if (event.type === ActionButtonType.edit)
      this.showUserDetailComponent(event.data, true);
    if (event.type === ActionButtonType.delete) this.removeUser(event.data.id);
  }

  createUser(data: UserModel) {
    this._userService.createUser(data).subscribe({
      next: () => {
        this._toastService.showSuccessToast(
          'User create successfully',
          'tr-global-toast'
        );
      },
      complete: () => {
        this.getAllusers(this.pagination.currentPage, this.pageSize);
      },
    });
  }

  updateUser(data: UserModel) {
    this._userService.updateUser(data).subscribe({
      next: () => {
        this._toastService.showSuccessToast(
          'Updated Successfully',
          'tr-global-toast'
        );
      },
      complete: () => {
        this.getAllusers(this.pagination.currentPage, this.pageSize);
      },
    });
  }

  removeUser(id: string) {
    this._confrimService.confirm({
      message: CONFIRMATION_MESSAGE.removeMessage,
      header: 'Confirm',
      icon: 'pi pi-info-circle',
      acceptIcon: 'none',
      acceptLabel: 'Yes',
      acceptButtonStyleClass: 'p-button-primary',
      rejectVisible: false,
      accept: () => {
        this._userService.deleteUser(id).subscribe({
          next: () => {
            this._toastService.showSuccessToast(
              'Remove Successfully',
              'tr-global-toast'
            );
          },
          complete: () => {
            this.getAllusers(this.pagination.currentPage, this.pageSize);
          },
        });
      },
    });
  }
}
