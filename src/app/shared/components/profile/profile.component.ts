import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonHeaderComponent } from '../common/common-header.component';
import { TabOneComponent } from './standalone-tabs/tab-one.component';
import { TabTwoComponent } from './standalone-tabs/tab-two.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    CommonModule,
    TabMenuModule,
    CommonHeaderComponent,
    TabOneComponent,
    TabTwoComponent,
  ],
})
export class ProfileComponent implements OnInit {
  constructor(private _authService: AuthenticationService) {}
  tabItems: MenuItem[] = [];
  activeItem: MenuItem | undefined;
  showDetailsTab: boolean | undefined;
  showRolesPermissionTab: boolean | undefined;
  loginUser = this._authService.currentUser;

  ngOnInit() {
    this.loadTabModules();
  }

  activeItemChange(event: any) {
    this.showDetailsTab = 'detail' === event.id;
    this.showRolesPermissionTab = 'role' === event.id;
  }

  loadTabModules() {
    this.tabItems = [
      {
        label: 'Detail',
        icon: 'pi pi-id-card',
        skipLocationChange: true,
        id: 'detail',
      },
      {
        label: 'Role & Permission',
        icon: 'pi pi-wrench',
        skipLocationChange: true,
        id: 'role',
      },
      {
        label: 'Security',
        icon: 'pi pi-shield',
        skipLocationChange: true,
        id: 'security',
      },
      {
        label: 'Account',
        icon: 'pi pi-cog',
        skipLocationChange: true,
        id: 'account',
      },
    ];
    this.activeItem = this.tabItems[0];
    this.showDetailsTab = true;
  }
}
