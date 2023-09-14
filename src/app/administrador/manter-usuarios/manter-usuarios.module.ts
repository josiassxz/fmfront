import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManterUsuariosRoutingModule } from './manter-usuarios-routing.module';
import { ManterUsuariosListComponent } from './manter-usuarios-list/manter-usuarios-list.component';
import { ManterUsuariosFormComponent } from './manter-usuarios-form/manter-usuarios-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManterUsuariosService } from './manter-usuarios.service';


@NgModule({
  declarations: [
    ManterUsuariosListComponent,
    ManterUsuariosFormComponent
  ],
  imports: [
    CommonModule,
    ManterUsuariosRoutingModule,
    SharedModule
  ],
  providers: [
    ManterUsuariosService
  ]
})
export class ManterUsuariosModule { }
