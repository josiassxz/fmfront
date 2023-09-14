import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManterUsuariosListComponent } from './manter-usuarios-list/manter-usuarios-list.component';
import { ManterUsuariosFormComponent } from './manter-usuarios-form/manter-usuarios-form.component';

const routes: Routes = [
  { path: 'manter-usuarios', redirectTo: 'lista', data: { title: '' } },
  {
    path: 'lista',
    component: ManterUsuariosListComponent,
    data: {
      title: 'Lista de Usuários',
    },
  },
  {
    path: 'form',
    component: ManterUsuariosFormComponent,
    data: {
      title: 'Incluir Usuário',
    },
  },
  {
    path: 'form/visualizar/:disabled/:id',
    component: ManterUsuariosFormComponent,
    data: {
      title: 'Visualizar Usuário',
    },
  },
  {
    path: 'form/editar/:disabled/:id',
    component: ManterUsuariosFormComponent,
    data: {
      title: 'Editar Usuário',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManterUsuariosRoutingModule { }
