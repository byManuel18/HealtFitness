import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),canActivate:[AuthServiceService]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'edit-add-producto',
    loadChildren: () => import('./pages/edit-add-producto/edit-add-producto.module').then( m => m.EditAddProductoPageModule)
  },
  {
    path: 'pagina-seleccion-productos',
    loadChildren: () => import('./pages/pagina-seleccion-productos/pagina-seleccion-productos.module').then( m => m.PaginaSeleccionProductosPageModule)
  },
  {
    path: 'edit-rutina',
    loadChildren: () => import('./pages/edit-rutina/edit-rutina.module').then( m => m.EditRutinaPageModule)
  },
  {
    path: 'edit-add-ejercicio',
    loadChildren: () => import('./pages/edit-add-ejercicio/edit-add-ejercicio.module').then( m => m.EditAddEjercicioPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
