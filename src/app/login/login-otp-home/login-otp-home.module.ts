import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginOtpHomePageRoutingModule } from './login-otp-home-routing.module';

import { LoginOtpHomePage } from './login-otp-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginOtpHomePageRoutingModule
  ],
  declarations: [LoginOtpHomePage]
})
export class LoginOtpHomePageModule {}
