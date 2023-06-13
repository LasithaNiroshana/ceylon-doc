import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginOtpHomePage } from './login-otp-home.page';

const routes: Routes = [
  {
    path: '',
    component: LoginOtpHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginOtpHomePageRoutingModule {}
