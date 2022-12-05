import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { EmpleosGuardadosComponent } from './empleos-guardados/empleos-guardados.component';
import { PerfilPostulanteComponent } from './perfil-postulante/perfil-postulante.component';

const routes: Routes =[
  {path:'postulaciones',component:PostulacionesComponent},
  {path:'empleos-guardados',component:EmpleosGuardadosComponent},
  {path:'perfil',component:PerfilPostulanteComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostulantesRoutingModule { }
