import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  menuActive!: boolean;
  home!: MenuItem;
  items: MenuItem[] = [];

  constructor(private router: Router) {}

  onMenuButtonClick() {
    this.menuActive = true;
    this.addClass(document.body, 'blocked-scroll');
  }

  onMaskClick() {
    this.hideMenu();
  }

  onMenuItemClick() {
    this.hideMenu();
  }

  hideMenu() {
    this.menuActive = false;
    this.removeClass(document.body, 'blocked-scroll');
  }

  addClass(element: any, className: string) {
    if (element.classList) element.classList.add(className);
    else element.className += ' ' + className;
  }

  removeClass(element: any, className: string) {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
  }

  renderBreadcrumbIcons(label: string): void {
    const module = label.toLocaleLowerCase();
    let icon = '';
    switch (module) {
      case 'dashboard':
        icon = 'pi pi-microsoft';
        break;
      case 'users':
        icon = 'pi pi-users';
        break;
    }

    this.home = { icon: icon, routerLink: '/application/' + module };
  }

  getAllItemsBreaCrumb() {
    this.items = [];
    const sanitizeUrl = this.router.url.split('?')[0];
    let str = sanitizeUrl.split('/') || this.router.url.split('/');
    str.shift();
    if (str.length > 0) {
      for (let i = 0; i < str.length; i++) {
        if (str[i].search('-') < 0) {
          str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        } else {
          if (str[i].split('-').join(' ').split(' ').length > 0) {
            let words = str[i].split('-').join(' ').split(' ');
            str[i] = '';
            for (let x = 0; x < words.length; x++) {
              str[i] +=
                words[x].charAt(0).toUpperCase() + words[x].substring(1) + ' ';
            }
          }
        }
        this.items.push({
          label: str[i].length > 15 ? str[i].substring(0, 10) + '...' : str[i],
        });
      }

      this.renderBreadcrumbIcons(str[1] || '');
    }
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.getAllItemsBreaCrumb();
    });
  }
}
