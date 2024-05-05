import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application.component';
import { AdminComponent } from '../../components/administrator/admin/admin.component';
import { ApplicationGuard } from '../../guards/application.guard';
import { UserComponent } from '../../components/administrator/user/user.component';
import { UserArchiveComponent } from '../../components/administrator/user-archive/user-archive.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
    canActivate: [ApplicationGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminComponent },
      { path: 'users', component: UserComponent },
      { path: 'users/archive', component: UserArchiveComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
