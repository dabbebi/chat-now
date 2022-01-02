import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../../services/chat.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

/*declare interface Route {
  path: string;
  message: string;
  title: string;
  icon: string;
  class: string;
}*/

export const ROUTES: RouteInfo[] = [
    { path: '/in/home', title: 'Home',  icon: 'users_circle-08', class: '' },
    { path: '/in/invitations', title: 'Invitations',  icon: 'users_circle-08', class: '' },
    { path: '/in/chat', title: 'Chat',  icon:'users_circle-08', class: '' },
    { path: '/in/notifications', title: 'Notifications',  icon:'users_circle-08', class: '' },
    { path: '/in/search', title: 'Search',  icon:'users_circle-08', class: '' },
    { path: '/in/profile', title: 'Profile',  icon:'users_circle-08', class: '' },
    { path: '/in/settings', title: 'Settings',  icon:'users_circle-08', class: '' },

];

@Component({
  selector: 'app-messages-sidebar',
  templateUrl: './messages-sidebar.component.html',
  styleUrls: ['./messages-sidebar.component.css']
})
export class MessagesSidebarComponent implements OnInit {
  menuItems: any[];

  Routes = [];
  constructor(private chatService : ChatService) { }

  ngOnInit() {
    this.getListMessages();
    this.menuItems = this.Routes.filter(menuItem => menuItem);
    setTimeout(() => {
      this.ngOnInit();
    }, 1000);
  }

  getListMessages(){
    this.chatService.getListMessages(localStorage.getItem('user_id')).subscribe((data : any) => {
      this.Routes = data;
      console.log(data);
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    });
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
  
}
