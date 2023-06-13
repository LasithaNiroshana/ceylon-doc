import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginMobileHomePageRoutingModule } from './login-mobile-home-routing.module';

import { LoginMobileHomePage } from './login-mobile-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginMobileHomePageRoutingModule
  ],
  declarations: [LoginMobileHomePage]
})
export class LoginMobileHomePageModule {}
