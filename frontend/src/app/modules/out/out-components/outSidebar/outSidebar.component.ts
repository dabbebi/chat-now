import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/out/login', title: 'Login',  icon: 'media-1_button-power', class: '' },
    { path: '/out/register', title: 'Register',  icon:'business_badge', class: '' },
];

@Component({
  selector: 'app-out-sidebar',
  templateUrl: './outSidebar.component.html',
  styleUrls: ['./outSidebar.component.css']
})
export class OutSidebarComponent implements OnInit {
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
}
