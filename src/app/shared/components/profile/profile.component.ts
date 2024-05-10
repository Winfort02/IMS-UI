import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabOneComponent } from './standalone-tabs/tab-one.component';
import { TabTwoComponent } from './standalone-tabs/tab-two.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  tabItems: MenuItem[] = [];
  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    this.loadTabModules();
  }

  openTabContents(component: any) {
    this.viewContainerRef.clear();
    this.viewContainerRef.createComponent(component);
  }

  loadTabModules() {
    this.tabItems = [
      {
        label: 'Tab One',
        icon: 'pi pi-lightbulb',
        skipLocationChange: true,
        command: () => this.openTabContents(TabOneComponent),
      },
      {
        label: 'Tab Two',
        icon: 'pi pi-sparkles',
        skipLocationChange: true,
        command: () => this.openTabContents(TabTwoComponent),
      },
    ];
  }
}
