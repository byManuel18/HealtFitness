import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAddEjercicioPage } from './edit-add-ejercicio.page';

const routes: Routes = [
  {
    path: '',
    component: EditAddEjercicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAddEjercicioPageRoutingModule {}
