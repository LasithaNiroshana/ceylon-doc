import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginMobileHomePageRoutingModule } from './login-mobile-home-routing.module';

import { LoginMobileHomePage } from './login-mobile-home.page';

// import { IonicInputMaskModule } from '@thiagoprz/ionic-input-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginMobileHomePageRoutingModule,
  ],
  declarations: [LoginMobileHomePage],
})
export class LoginMobileHomePageModule {}
