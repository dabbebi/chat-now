import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InRoutes } from './in.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { InComponentsModule } from './in-components/inComponents.module';
import { InComponent } from './in.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SearchComponent } from './search/search.component';
import { InvitationsComponent } from './invitations/invitations.component';



@NgModule({
  declarations: [
    InComponent,
    HomeComponent,
    ProfileComponent,
    SettingsComponent,
    NotificationsComponent,
    SearchComponent,
    InvitationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(InRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    InComponentsModule
  ],
  providers: [],
  bootstrap: [InComponent]
})
export class InModule { }
