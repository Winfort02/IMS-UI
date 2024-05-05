import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastMessageService } from 'src/app/core/services/toast-message.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('submenu', [
      state(
        'hidden',
        style({
          height: '0',
          overflow: 'hidden',
          opacity: 0,
        })
      ),
      state(
        'visible',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() active!: boolean;
  @Output() menuItemClick: EventEmitter<any> = new EventEmitter();

  loginUser = this._authenticationService.currentUser;

  activeSubmenus: { [key: string]: boolean } = {};

  sideItems: MenuItem[] = [];

  scrollable = true;

  constructor(
    private router: Router,
    private _authenticationService: AuthenticationService,
    private _spinner: NgxSpinnerService,
    private _toastService: ToastMessageService
  ) {}

  getAcroName() {
    const name = this.loginUser.name.trim().split(' ');
    const firstName = name[0] || '';
    const lastName = name[name.length - 1] || '';
    const getFirstLetter = (string: string) => {
      return string.slice(0, 1);
    };
    return `${getFirstLetter(firstName)}${getFirstLetter(lastName)}`;
  }

  onMenuItemClick() {
    this.menuItemClick.emit();
  }

  toggleSubmenu(event: Event, name: string) {
    this.activeSubmenus[name] = this.activeSubmenus[name] ? false : true;
    event.preventDefault();
  }

  isSubmenuActive(name: string) {
    if (this.activeSubmenus.hasOwnProperty(name)) {
      return this.activeSubmenus[name];
    } else if (this.router.isActive(name, false)) {
      this.activeSubmenus[name] = true;
      return true;
    }

    return false;
  }

  checkActiveState(givenLink: any) {
    if (this.router.url.indexOf(givenLink) === -1) {
      return false;
    } else {
      return true;
    }
  }

  redirectTo(route: string) {
    this.router.navigate([route], {
      queryParams: { returnUrl: `${this.router.url}` },
    });
  }

  logout() {
    this._spinner.show();
    setTimeout(() => {
      localStorage.clear();
      this.router.navigate(['/security/login']);
      this._spinner.hide();
      this._toastService.showSuccessToast(
        'Session was ended successfully!',
        'tr-global-toast'
      );
    }, 500);
  }

  loadModules() {
    this.sideItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-microsoft',
        routerLink: '/application',
        command: () => this.onMenuItemClick(),
      },
      {
        label: 'Users',
        icon: 'pi pi-users',
        routerLink: '/application/users',
        command: () => this.onMenuItemClick(),
      },
      {
        label: 'Settings',
        items: [
          {
            label: 'End Session',
            icon: 'pi pi-sign-out',
            command: () => {
              this.onMenuItemClick();
              this.logout();
            },
          },
        ],
      },
    ];
  }

  ngOnInit(): void {
    this.loadModules();
  }
}
