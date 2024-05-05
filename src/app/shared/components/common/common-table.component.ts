import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { PaginationModel } from 'src/app/core/models/pagination.model';

@Component({
  standalone: true,
  selector: 'app-common-table',
  styles: [
    `
      .active-button {
        background-color: red;
        color: #ffffff;
      }
    `,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
  ],
  template: `<div class="col-12">
    <p-table
      [columns]="cols"
      [value]="data"
      class="w-full"
      styleClass="p-datatable-striped"
      [tableStyle]="{ 'min-width': '60rem' }"
      [loading]="loading"
    >
      <ng-template pTemplate="header" let-columns>
        <tr>
          <th *ngFor="let col of columns" [pSortableColumn]="col.field">
            {{ col.header }} <p-sortIcon [field]="col.field" />
          </th>
          <th *ngFor="let action of actionButton" class="text-center">
            {{ action.label }}
          </th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-rowData let-columns="columns">
        <tr>
          <td *ngFor="let col of columns">
            {{ rowData[col.field] }}
          </td>
          <td *ngFor="let action of actionButton" class="w-1 text-center">
            <p-button
              [label]="action.label"
              [severity]="action.severity"
              size="small"
              (click)="onActionButtonClick(rowData, action.type)"
            />
          </td>
        </tr>
      </ng-template>
    </p-table>
    <div class="col-12" *ngIf="hasPagination">
      <div
        class="flex sm:align-items-start md:align-items-center column-gap-1 row-gap-1"
      >
        <div>
          <button
            pButton
            pRipple
            type="button"
            label="<<"
            class="p-button-text p-button-sm p-button-secondary"
            id="firstPage"
            (click)="onPaginatePage('firstPage')"
          ></button>
        </div>
        <div>
          <button
            pButton
            pRipple
            type="button"
            label="Prev"
            class="p-button-text p-button-sm p-button-secondary"
            my-1
            id="prevPage"
            (click)="onPaginatePage('prevPage')"
          ></button>
        </div>
        <div class="flex flex-wrap column-gap-1 row-gap-1">
          <button
            *ngFor="let page of getPageNumbers()"
            pButton
            type="button"
            class="p-button-text p-button-sm text-white"
            [ngClass]="{
              'surface-500': pagination.currentPage == page,
              'bg-teal-500': pagination.currentPage != page
            }"
            [style]="{ width: '50px' }"
            (click)="onPageChange(page)"
            label="{{ page }}"
          ></button>
        </div>
        <div>
          <button
            pButton
            pRipple
            type="button"
            label="Next"
            class="p-button-text p-button-sm p-button-secondary"
            id="nextPage"
            (click)="onPaginatePage('nextPage')"
          ></button>
        </div>
        <div>
          <button
            pButton
            pRipple
            type="button"
            label=">>"
            class="p-button-text p-button-sm p-button-secondary my-1"
            (click)="onPaginatePage('lastPage')"
          ></button>
        </div>
        <div>
          <p-dropdown
            [options]="rows"
            [(ngModel)]="maxRow"
            optionLabel="name"
            (onChange)="selectedRow()"
          ></p-dropdown>
        </div>
      </div>
    </div>
  </div>`,
})
export class CommonTableComponent implements OnInit {
  @Input() cols: Array<object> = [];
  @Input() data: Array<object> = [];
  @Input() loading: boolean = false;
  @Input() actionButton: Array<any> = [];
  @Input() hasPagination: boolean = false;
  @Input() isLazyLoad = false;
  @Input() pagination = new PaginationModel();
  @Output() actionButtonClick = new EventEmitter();
  @Output() paginatePage = new EventEmitter<string>();
  @Output() pageChanged = new EventEmitter<number>();
  @Output() maxRowChange = new EventEmitter<any>();

  rows = [
    { name: '25', row: 25 },
    { name: '50', row: 50 },
    { name: '100', row: 100 },
  ];

  maxRow = this.rows[0];

  onPageChange(page: number) {
    this.pageChanged.emit(page);
  }

  selectedRow() {
    this.maxRowChange.emit(this.maxRow);
  }

  onPaginatePage(page: string) {
    this.paginatePage.emit(page);
  }

  getPageNumbers(): number[] {
    return Array(this.pagination.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  onActionButtonClick(data: any, type: string) {
    const emetter = {
      data: data,
      type,
    };
    this.actionButtonClick.emit(emetter);
  }

  ngOnInit(): void {
    this.selectedRow();
  }
}
