import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAddProductoPageRoutingModule } from './edit-add-producto-routing.module';

import { EditAddProductoPage } from './edit-add-producto.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditAddProductoPageRoutingModule,
    TranslateModule,
  ],
  declarations: [EditAddProductoPage],
  exports:[TranslateModule]
})
export class EditAddProductoPageModule {}
