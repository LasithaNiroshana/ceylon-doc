import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginOtpHomePageRoutingModule } from './login-otp-home-routing.module';

import { LoginOtpHomePage } from './login-otp-home.page';

// import { CodeInputModule } from 'angular-code-input';

// import { IonicInputMaskModule } from '@thiagoprz/ionic-input-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginOtpHomePageRoutingModule,
  ],
  declarations: [LoginOtpHomePage],
})
export class LoginOtpHomePageModule {}
