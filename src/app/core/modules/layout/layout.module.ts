import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

import { LayoutRoutingModule } from './layout.routing.module';
import { SidebarComponent } from 'src/app/shared/components/layout/sidebar/sidebar.component';
import { TopBarComponent } from 'src/app/shared/components/layout/topbar/topbar.component';
import { FooterComponent } from 'src/app/shared/components/layout/footer/footer.component';
import { LayoutComponent } from './layout.component';

// PRIMENG MODULES
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { TabViewModule } from 'primeng/tabview';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    SidebarComponent,
    TopBarComponent,
    FooterComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MenubarModule,
    SidebarModule,
    MenuModule,
    TabViewModule,
    PanelMenuModule,
    BreadcrumbModule,
    ToastModule,
  ],
  exports: [
    SidebarComponent,
    TopBarComponent,
    FooterComponent,
    LayoutComponent,
  ],
  providers: [DatePipe],
})
export class LayoutModule {}
