import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentsPageRoutingModule } from './appointments-routing.module';

import { AppointmentsPage } from './appointments.page';
import {ComponentsModule} from '../components/components.module';
import {MaterialModule} from '../material/material.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentsPageRoutingModule,
    ComponentsModule,
    MaterialModule
  ],
  declarations: [AppointmentsPage]
})
export class AppointmentsPageModule {}
