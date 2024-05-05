import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  standalone: true,
  selector: 'app-common-spinner',
  imports: [CommonModule, NgxSpinnerModule],
  template: ` <ngx-spinner
    bdColor="#fff"
    size="medium"
    color="rgba(0, 0, 0, 0.8)"
    type="ball-clip-rotate-multiple"
  >
    <p class="text-xl text-700 font-bold">Processing ...</p>
  </ngx-spinner>`,
})
export class CommonSpinnerComponent {}
