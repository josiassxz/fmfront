import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManterEmpresasListComponent } from './manter-empresas-list/manter-empresas-list.component';
import { ManterEmpresasFormComponent } from './manter-empresas-form/manter-empresas-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  {
    path: 'lista',
    component: ManterEmpresasListComponent,
    data: {
      title: 'Lista de Empresas',
    },
  },
  {
    path: 'form',
    component: ManterEmpresasFormComponent,
    data: {
      title: 'Incluir Empresa',
    },
  },
  {
    path: 'form/visualizar/:disabled/:id',
    component: ManterEmpresasFormComponent,
    data: {
      title: 'Visualizar Empresa',
    },
  },
  {
    path: 'form/editar/:disabled/:id',
    component: ManterEmpresasFormComponent,
    data: {
      title: 'Editar Empresa',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManterEmpresasRoutingModule { }
