import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';


export const InRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home',               component: HomeComponent },

  { path: 'profile/:id',            component: ProfileComponent },
  {
    path: 'profile',
    redirectTo: 'profile/' + localStorage.getItem('user_id'),
    pathMatch: 'full',
  },
  { path: 'settings',           component: SettingsComponent },
  { path: 'notifications',      component: NotificationsComponent },
  { path: 'search',             component: SearchComponent },
  { path: 'invitations',        component: InvitationsComponent },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];