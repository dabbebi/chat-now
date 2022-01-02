import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { InComponent } from './modules/in/in.component';
import { OutComponent } from './modules/out/out.component';
import { IsInGuard } from './guards/is-in.guard';
import { IsOutGuard } from './guards/is-out.guard';
import { MessagesComponent } from './modules/messages/messages.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'in',
    pathMatch: 'full',
  }, {
    path: 'in',
    component: InComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./modules/in/in.module').then(x => x.InModule)
  }],
  canActivate : [IsInGuard]
}, {
  path: 'messages',
  component: MessagesComponent,
  children: [
      {
    path: '',
    loadChildren: () => import('./modules/messages/messages.module').then(x => x.MessagesModule)
}],
canActivate : [IsInGuard]
}, {
    path: 'out',
    component: OutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./modules/out/out.module').then(x => x.OutModule)
  }],
  canActivate : [IsOutGuard]
},
  {
    path: '**',
    redirectTo: 'in'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
