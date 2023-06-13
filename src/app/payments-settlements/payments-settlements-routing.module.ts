import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsSettlementsPage } from './payments-settlements.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentsSettlementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsSettlementsPageRoutingModule {}
