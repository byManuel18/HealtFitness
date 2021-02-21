import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAddProductoPage } from './edit-add-producto.page';

const routes: Routes = [
  {
    path: '',
    component: EditAddProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAddProductoPageRoutingModule {}
