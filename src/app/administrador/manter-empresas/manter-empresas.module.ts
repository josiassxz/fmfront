import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManterEmpresasRoutingModule } from './manter-empresas-routing.module';
import { ManterEmpresasListComponent } from './manter-empresas-list/manter-empresas-list.component';
import { ManterEmpresasFormComponent } from './manter-empresas-form/manter-empresas-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManterEmpresasService } from './manter-empresas.service';
import { ManterUsuariosService } from '../manter-usuarios/manter-usuarios.service';
import { NotificationService } from 'src/app/shared/notification.service';


@NgModule({
  declarations: [
    ManterEmpresasListComponent,
    ManterEmpresasFormComponent
  ],
  imports: [
    CommonModule,
    ManterEmpresasRoutingModule,
    SharedModule
  ],
  providers : [
    ManterEmpresasService,
    ManterUsuariosService,
    NotificationService
  ]
})
export class ManterEmpresasModule { }
