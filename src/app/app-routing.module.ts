import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./appointments/appointments.module').then(
        (m) => m.AppointmentsPageModule
      ),
  },
  {
    path: 'payments-settlements',
    loadChildren: () =>
      import('./payments-settlements/payments-settlements.module').then(
        (m) => m.PaymentsSettlementsPageModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./login/login-mobile-home/login-mobile-home.module').then(
        (m) => m.LoginMobileHomePageModule
      ),
  },
  {
    path: 'login-otp-home',
    loadChildren: () =>
      import('./login/login-otp-home/login-otp-home.module').then(
        (m) => m.LoginOtpHomePageModule
      ),
  },
  {
    path: 'select-doctor',
    loadChildren: () => import('./login/select-doctor/select-doctor.module').then( m => m.SelectDoctorPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
