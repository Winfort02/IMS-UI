import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  standalone: true,
  selector: 'app-common-header',
  imports: [CommonModule, ButtonModule, InputTextModule],
  template: `
    <div class="flex col-12 flex-column sm:flex-column md:flex-row lg:flex-row">
      <div class=" flex align-items-center col-12 sm:col-12 md:col-6 lg:col-6">
        <h4 class="text-md uppercase text-500 px-2 mt-3">{{ title }}</h4>
      </div>
      <div
        class="col-12 sm:col-12 md:col-6 lg:col-6 flex justify-content-end align-items-center gap-2"
      >
        <input
          type="text"
          pInputText
          class="p-input-text-lg outline-none w-full"
          placeholder="Search"
          (input)="search($event)"
          *ngIf="hasSearchInput"
        />
        <p-button
          *ngIf="hasnavigationButton"
          [label]="archiveButtonLabel"
          severity="secondary"
          (click)="navigateToArchiveList(archiveUrl)"
        />
        <p-button
          *ngIf="hasActionButton"
          [label]="buttonLabel"
          [icon]="buttonIcon"
          (click)="onActionButtonClick()"
        />
      </div>
    </div>
  `,
})
export class CommonHeaderComponent {
  @Input() title: string = '';
  @Input() hasActionButton: boolean = false;
  @Input() buttonLabel: string = '';
  @Input() buttonIcon: string = '';
  @Input() archiveUrl = '';
  @Input() hasnavigationButton = false;
  @Input() archiveButtonLabel = 'Archive';
  @Input() hasSearchInput = false;
  @Output() actionButtonClick: EventEmitter<any> = new EventEmitter();
  @Output() searchAction: EventEmitter<any> = new EventEmitter();

  constructor(private _router: Router) {}

  search(event: any) {
    this.searchAction.emit(event.target.value);
  }

  onActionButtonClick() {
    this.actionButtonClick.emit();
  }

  navigateToArchiveList(url: string) {
    this._router.navigate([url]);
  }
}
