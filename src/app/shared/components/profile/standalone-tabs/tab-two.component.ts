import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-tab-two',
  imports: [CommonModule],
  template: `<div
    class="container flex flex-column justify-content-center align-items-center"
  >
    <div class="col-12"><h4>Roles & Permission Tab</h4></div>
  </div>`,
})
export class TabTwoComponent implements OnInit {
  ngOnInit(): void {}
}
