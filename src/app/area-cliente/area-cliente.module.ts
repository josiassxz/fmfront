import { NgModule } from '@angular/core';

import { AreaClienteRoutingModule } from './area-cliente-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { EquipamentosListComponent } from './equipamentos-list/equipamentos-list.component';
import { ManterEmpresasService } from '../administrador/manter-empresas/manter-empresas.service';
import { ManterEquipamentosService } from '../administrador/manter-equipamentos/manter-equipamentos.service';
import { DialogDownloadComponent } from './equipamentos-list/dialog-download/dialog-download.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EquipamentosListComponent,
    DialogDownloadComponent
  ],
  imports: [
    SharedModule,
    AreaClienteRoutingModule
  ],
  providers: [ManterEmpresasService, ManterEquipamentosService]
})
export class AreaClienteModule { }
