import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';



export const MessagesRoutes: Routes = [
  { path: '',               component: ChatComponent },

  { path: ':id',            component: ChatComponent },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];