import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrarUsuariosComponent } from './administrar-usuarios/administrar-usuarios.component';
import { AdministrarTablasComponent } from './administrar-tablas/administrar-tablas.component';
import { AdministrarPublicacionesComponent } from './administrar-publicaciones/administrar-publicaciones.component';
import { InformeDeDatosComponent } from './informe-de-datos/informe-de-datos.component';
import { AdministradorRoutingModule } from './administrador-routing.module';



@NgModule({
  declarations: [
    AdministrarUsuariosComponent,
    AdministrarTablasComponent,
    AdministrarPublicacionesComponent,
    InformeDeDatosComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule
  ]
})
export class AdministradorModule { }
