import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { OutFooterComponent } from './outFooter/outFooter.component';
import { OutNavbarComponent } from './outNavbar/outNavbar.component';
import { OutSidebarComponent } from './outSidebar/outSidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    OutFooterComponent,
    OutNavbarComponent,
    OutSidebarComponent
  ],
  exports: [
    OutFooterComponent,
    OutNavbarComponent,
    OutSidebarComponent
  ]
})
export class OutComponentsModule { }
