import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsSettlementsPageRoutingModule } from './payments-settlements-routing.module';

import { PaymentsSettlementsPage } from './payments-settlements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentsSettlementsPageRoutingModule,
  ],
  declarations: [PaymentsSettlementsPage]
})
export class PaymentsSettlementsPageModule {}
