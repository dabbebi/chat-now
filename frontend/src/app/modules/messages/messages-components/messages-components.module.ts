import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessagesFooterComponent } from './messages-footer/messages-footer.component';
import { MessagesSidebarComponent } from './messages-sidebar/messages-sidebar.component';
import { MessagesNavbarComponent } from './messages-navbar/messages-navbar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    MessagesFooterComponent,
    MessagesSidebarComponent,
    MessagesNavbarComponent
  ],
  exports: [
    MessagesFooterComponent,
    MessagesSidebarComponent,
    MessagesNavbarComponent
  ]
})
export class MessagesComponentsModule { }
