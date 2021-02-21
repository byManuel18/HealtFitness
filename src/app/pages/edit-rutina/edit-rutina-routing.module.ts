import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRutinaPage } from './edit-rutina.page';

const routes: Routes = [
  {
    path: '',
    component: EditRutinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRutinaPageRoutingModule {}
