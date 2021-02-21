import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaSeleccionProductosPageRoutingModule } from './pagina-seleccion-productos-routing.module';

import { PaginaSeleccionProductosPage } from './pagina-seleccion-productos.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaSeleccionProductosPageRoutingModule,
    TranslateModule,
  ],
  declarations: [PaginaSeleccionProductosPage],
  exports:[TranslateModule]
})
export class PaginaSeleccionProductosPageModule {}
