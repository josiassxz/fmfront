import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManterEquipamentosRoutingModule } from './manter-equipamentos-routing.module';
import { ManterEquipamentosListComponent } from './manter-equipamentos-list/manter-equipamentos-list.component';
import { ManterEquipamentosFormComponent } from './manter-equipamentos-form/manter-equipamentos-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EquipamentosFileUploadComponent } from './equipamentos-file-upload/equipamentos-file-upload.component';
import { ManterEmpresasService } from '../manter-empresas/manter-empresas.service';
import { ManterEquipamentosService } from './manter-equipamentos.service';
import { NotificationService } from 'src/app/shared/notification.service';


@NgModule({
  declarations: [
    ManterEquipamentosListComponent,
    ManterEquipamentosFormComponent,
    EquipamentosFileUploadComponent
  ],
  imports: [
    CommonModule,
    ManterEquipamentosRoutingModule,
    SharedModule
  ],
  providers : [
    ManterEmpresasService,
    NotificationService,
    ManterEquipamentosService
  ]
})
export class ManterEquipamentosModule { }
