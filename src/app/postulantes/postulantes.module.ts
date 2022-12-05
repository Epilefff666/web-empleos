import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { EmpleosGuardadosComponent } from './empleos-guardados/empleos-guardados.component';
import { PerfilPostulanteComponent } from './perfil-postulante/perfil-postulante.component';
import { PostulantesRoutingModule } from './postulantes-routing.module';



@NgModule({
  declarations: [
    PostulacionesComponent,
    EmpleosGuardadosComponent,
    PerfilPostulanteComponent
  ],
  imports: [
    CommonModule,
    PostulantesRoutingModule
  ]
})
export class PostulantesModule { }
