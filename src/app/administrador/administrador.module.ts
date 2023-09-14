import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { MenuAdministradorComponent } from './menu-administrador/menu-administrador.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MenuAdministradorComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    SharedModule
  ]
})
export class AdministradorModule { }
