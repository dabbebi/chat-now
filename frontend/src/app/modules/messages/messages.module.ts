import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MessagesComponentsModule } from './messages-components/messages-components.module';
import { MessagesRoutes } from './messages.routing';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    MessagesComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MessagesRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    MessagesComponentsModule
  ],
  providers: [],
  bootstrap: [MessagesComponent]
})
export class MessagesModule { }
