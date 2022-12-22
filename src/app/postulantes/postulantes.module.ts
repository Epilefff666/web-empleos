import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { EmpleosGuardadosComponent } from './empleos-guardados/empleos-guardados.component';
import { PerfilPostulanteComponent } from './perfil-postulante/perfil-postulante.component';
import { PostulantesRoutingModule } from './postulantes-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    PostulacionesComponent,
    EmpleosGuardadosComponent,
    PerfilPostulanteComponent
  ],
  imports: [
    CommonModule,
    PostulantesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ]
})
export class PostulantesModule { }
