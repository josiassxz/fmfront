import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuAdministradorComponent } from './menu-administrador/menu-administrador.component';
import { ManterUsuariosListComponent } from './manter-usuarios/manter-usuarios-list/manter-usuarios-list.component';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MenuAdministradorComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'manter-usuarios',
    loadChildren: () => import('src/app/administrador/manter-usuarios/manter-usuarios.module').then(m => m.ManterUsuariosModule),
    data: { title: 'Manter Usuários', icon: 'manage_accounts' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'manter-empresas',
    loadChildren: () => import('src/app/administrador/manter-empresas/manter-empresas.module').then(m => m.ManterEmpresasModule),
    data: { title: 'Manter Empresas', icon: 'apartment' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'manter-equipamentos',
    loadChildren: () => import('src/app/administrador/manter-equipamentos/manter-equipamentos.module').then(m => m.ManterEquipamentosModule),
    data: { title: 'Manter Equipamentos', icon: 'construction' },
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
