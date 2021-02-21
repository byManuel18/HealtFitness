import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAddEjercicioPageRoutingModule } from './edit-add-ejercicio-routing.module';

import { EditAddEjercicioPage } from './edit-add-ejercicio.page';
import { TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    EditAddEjercicioPageRoutingModule
  ],
  declarations: [EditAddEjercicioPage],
  exports:[TranslateModule]
})
export class EditAddEjercicioPageModule {}
