import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InFooterComponent } from './inFooter/inFooter.component';
import { InNavbarComponent } from './inNavbar/inNavbar.component';
import { InSidebarComponent } from './inSidebar/inSidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    InFooterComponent,
    InNavbarComponent,
    InSidebarComponent
  ],
  exports: [
    InFooterComponent,
    InNavbarComponent,
    InSidebarComponent
  ]
})
export class InComponentsModule { }
