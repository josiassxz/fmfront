import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'administrador',
    loadChildren: () =>
      import('../app/administrador/administrador.module').then(m => m.AdministradorModule),
    data: { title: 'Administrador', ignoreBreadcrumb: true, icon: 'engineering' }
  },
  {
    path: 'area-cliente',
    loadChildren: () =>
      import('../app/area-cliente/area-cliente.module').then(m => m.AreaClienteModule),
    data: { title: 'Área do Cliente', icon: 'group' }
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../app/home/home.module').then(m => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
