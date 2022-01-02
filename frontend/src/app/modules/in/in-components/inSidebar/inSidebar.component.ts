import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/in/home', title: 'Home',  icon: 'design_bullet-list-67', class: '' },
    { path: '/in/invitations', title: 'Invitations',  icon: 'business_badge', class: '' },
    { path: '/messages', title: 'Chat',  icon:'ui-2_chat-round', class: '' },
    { path: '/in/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
    { path: '/in/search', title: 'Search',  icon:'ui-1_zoom-bold', class: '' },
    { path: '/in/profile', title: 'Profile',  icon:'users_single-02', class: '' },
    { path: '/in/settings', title: 'Settings',  icon:'loader_gear', class: '' },

];

@Component({
  selector: 'app-in-sidebar',
  templateUrl: './inSidebar.component.html',
  styleUrls: ['./inSidebar.component.css']
})
export class InSidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('user_id');
    window.location.replace('/out/login');
  }
}
