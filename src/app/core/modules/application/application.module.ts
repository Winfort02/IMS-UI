import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationRoutingModule } from './application.routing';
import { ApplicationComponent } from './application.component';
import { LayoutModule } from '../layout/layout.module';
import { AdminComponent } from '../../components/administrator/admin/admin.component';
import { UserComponent } from '../../components/administrator/user/user.component';
import { CommonHeaderComponent } from 'src/app/shared/components/common/common-header.component';
import { CommonTableComponent } from 'src/app/shared/components/common/common-table.component';
import { DialogService } from 'primeng/dynamicdialog';
import { UserArchiveComponent } from '../../components/administrator/user-archive/user-archive.component';

@NgModule({
  declarations: [
    ApplicationComponent,
    AdminComponent,
    UserComponent,
    UserArchiveComponent,
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    LayoutModule,
    CommonHeaderComponent,
    CommonTableComponent,
  ],
  providers: [DialogService],
})
export class ApplicationModule {}
