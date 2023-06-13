import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [],
  imports: [
    IonicModule,
    CommonModule,
    MatTabsModule
  ],
  exports:[
    MatTabsModule
  ]
})
export class MaterialModule { }
