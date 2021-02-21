import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRutinaPageRoutingModule } from './edit-rutina-routing.module';

import { EditRutinaPage } from './edit-rutina.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditRutinaPageRoutingModule,
    TranslateModule
  ],
  declarations: [EditRutinaPage],
  exports:[TranslateModule]
})
export class EditRutinaPageModule {}
