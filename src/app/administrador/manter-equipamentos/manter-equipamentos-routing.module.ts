import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManterEquipamentosListComponent } from './manter-equipamentos-list/manter-equipamentos-list.component';
import { ManterEquipamentosFormComponent } from './manter-equipamentos-form/manter-equipamentos-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  {
    path: 'lista',
    component: ManterEquipamentosListComponent,
    data: {
      title: 'Lista de Equipamentos',
    },
  },
  {
    path: 'form',
    component: ManterEquipamentosFormComponent,
    data: {
      title: 'Incluir Equipamento',
    },
  },
  {
    path: 'form/visualizar/:disabled/:id',
    component: ManterEquipamentosFormComponent,
    data: {
      title: 'Visualizar Equipamento',
    },
  },
  {
    path: 'form/editar/:disabled/:id',
    component: ManterEquipamentosFormComponent,
    data: {
      title: 'Editar Equipamento',
    },
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManterEquipamentosRoutingModule { }
