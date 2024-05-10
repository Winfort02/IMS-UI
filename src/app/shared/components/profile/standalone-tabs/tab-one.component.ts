import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/core/models/user.model';

@Component({
  standalone: true,
  selector: 'app-tab-one',
  imports: [CommonModule],
  template: `<div
    class="container flex flex-column justify-content-center align-items-center"
  >
    <div class="col-12"><h4>Details Tab</h4></div>
  </div>`,
})
export class TabOneComponent implements OnInit {
  @Input() user: UserModel = new UserModel();
  ngOnInit(): void {
    console.log(this.user);
  }
}
