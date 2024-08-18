import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { PwdRecoveryComponent } from './pwd-recovery.component';


@NgModule({
  declarations: [
    LoginComponent,
    PwdRecoveryComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
