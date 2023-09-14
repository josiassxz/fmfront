import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { EquipamentosListComponent } from './equipamentos-list/equipamentos-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Dashboard', icon: 'dashboard' }
  },
  {
    path: 'equipamentos/:id',
    component: EquipamentosListComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Lista de Equipamentos', icon: 'list_alt' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaClienteRoutingModule { }
