import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginMobileHomePage } from './login-mobile-home.page';

const routes: Routes = [
  {
    path: '',
    component: LoginMobileHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginMobileHomePageRoutingModule {}
