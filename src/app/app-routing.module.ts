import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'security', pathMatch: 'full' },
  {
    path: 'security',
    loadChildren: () =>
      import('./core/modules/security/security.module').then(
        (m) => m.SecurityModule
      ),
  },
  {
    path: 'application',
    loadChildren: () =>
      import('./core/modules/application/application.module').then(
        (m) => m.ApplicationModule
      ),
  },
  { path: '**', redirectTo: 'security', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
