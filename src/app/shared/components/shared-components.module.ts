import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, TabMenuModule],
})
export class SharedComponentsModule {}
