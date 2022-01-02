import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OutRoutes } from './out.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutComponentsModule } from './out-components/outComponents.module';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { OutComponent } from './out.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    OutComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(OutRoutes),
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    OutComponentsModule
  ],
  providers: [],
  bootstrap: [OutComponent]
})
export class OutModule { }
