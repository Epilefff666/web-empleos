import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PublicarEmpleoComponent } from './publicar-empleo/publicar-empleo.component';
import { PostulantesComponent } from './postulantes/postulantes.component';
import { EmpleosPublicadosComponent } from './empleos-publicados/empleos-publicados.component';
import { PerfilEmpresaComponent } from './perfil-empresa/perfil-empresa.component';

const routes: Routes =[
  {path:'publicar-empleo',component:PublicarEmpleoComponent},

  {path:'postulantes',component:PostulantesComponent},

  {path:'empleos-publicados',component:EmpleosPublicadosComponent},

  {path:'perfil', component:PerfilEmpresaComponent}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
