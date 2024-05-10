import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import {
  CreateArchiveTableColumn,
  CreateArchiveActionButton,
} from 'src/app/core/helpers/table.helper';
import { PaginationModel } from 'src/app/core/models/pagination.model';
import { UserModel } from 'src/app/core/models/user.model';
import { ToastMessageService } from 'src/app/core/services/toast-message.service';
import { UserService } from 'src/app/core/services/user.service';
import { Pagination } from 'src/app/core/enum/pagination.enum';
import { ActionButtonType } from 'src/app/core/enum/action-button.enum';
import { CONFIRMATION_MESSAGE } from 'src/app/core/constant/confirmation-message.constant';

@Component({
  selector: 'app-user-archive',
  templateUrl: './user-archive.component.html',
  styleUrls: ['./user-archive.component.scss'],
})
export class UserArchiveComponent implements OnInit, OnDestroy {
  cols = CreateArchiveTableColumn();
  actionButton = CreateArchiveActionButton();
  users: UserModel[] = [];
  isLoading = true;
  pagination = new PaginationModel();
  pageSize: number | undefined;
  archiveSubscription!: Subscription;

  constructor(
    private _userService: UserService,
    private _confrimService: ConfirmationService,
    private _toastService: ToastMessageService
  ) {}
  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.archiveSubscription) this.archiveSubscription.unsubscribe();
  }

  onSelectPage(event: number) {
    this.getArchiveUsers(event, this.pageSize);
  }

  onSelectRowSize(event: any) {
    this.pageSize = event.row;
    this.getArchiveUsers(this.pagination.currentPage, this.pageSize);
  }

  onPaginate(event: string) {
    if (event === Pagination.first)
      this.getArchiveUsers(this.pagination.firstPage, this.pageSize);
    if (event === Pagination.next)
      this.getArchiveUsers(this.pagination.nextPage, this.pageSize);
    if (event === Pagination.prev)
      this.getArchiveUsers(this.pagination.prevPage, this.pageSize);
    if (event === Pagination.last)
      this.getArchiveUsers(this.pagination.lastPage, this.pageSize);
  }

  getArchiveUsers(page: number, pageSize: number = 20) {
    this.isLoading = true;
    this.archiveSubscription = this._userService
      .getAllArchiveUsers(page, pageSize)
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

  onClickActionButton(event: any) {
    if (event.type === ActionButtonType.restore) this.restoreUser(event.data);
    if (event.type === ActionButtonType.delete) this.deleteUser(event.data.id);
  }

  deleteUser(id: string) {
    this._confrimService.confirm({
      message: CONFIRMATION_MESSAGE.deleteMessage,
      header: 'Confirm',
      icon: 'pi pi-info-circle',
      acceptIcon: 'none',
      acceptLabel: 'Yes',
      acceptButtonStyleClass: 'p-button-primary',
      rejectVisible: false,
      accept: () => {
        this._userService.removeUser(id).subscribe({
          next: () => {
            this._toastService.showSuccessToast(
              'Deleted Successfully',
              'tr-global-toast'
            );
          },
          complete: () => {
            this.getArchiveUsers(this.pagination.currentPage, this.pageSize);
          },
        });
      },
    });
  }

  restoreUser(user: UserModel) {
    this._confrimService.confirm({
      message: 'Are you sure you want to restore this record ?',
      header: 'Confirm',
      icon: 'pi pi-info-circle',
      acceptIcon: 'none',
      acceptLabel: 'Yes',
      acceptButtonStyleClass: 'p-button-primary',
      rejectVisible: false,
      accept: () => {
        this._userService.restoreUser(user).subscribe({
          next: () => {
            this._toastService.showSuccessToast(
              'Restored Successfully',
              'tr-global-toast'
            );
          },
          complete: () => {
            this.getArchiveUsers(this.pagination.currentPage, this.pageSize);
          },
        });
      },
    });
  }
}
