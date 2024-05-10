import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-tab-two',
  imports: [CommonModule, InputTextModule, ButtonModule, ReactiveFormsModule],
  template: `<p>Second Tab</p>`,
})
export class TabTwoComponent implements OnInit {
  ngOnInit(): void {}
}
