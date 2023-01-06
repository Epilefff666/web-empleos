import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicarEmpleoComponent } from './publicar-empleo/publicar-empleo.component';
import { PostulantesComponent } from './postulantes/postulantes.component';
import { EmpleosPublicadosComponent } from './empleos-publicados/empleos-publicados.component';
import { PerfilEmpresaComponent } from './perfil-empresa/perfil-empresa.component';
import { EditarPublicacionComponent } from './editar-publicacion/editar-publicacion.component';
import { DetallePostulanteComponent } from './detalle-postulante/detalle-postulante.component';


const routes: Routes =[
  {path:'publicar-empleo',component:PublicarEmpleoComponent},

  {path:'postulantes',component:PostulantesComponent},

  {path:'postulantes/detalle-postulante/:postulanteId/:publicacionId',component:DetallePostulanteComponent},

  {path:'empleos-publicados',component:EmpleosPublicadosComponent},

  {path:'editar-publicacion/:id',component:EditarPublicacionComponent},

  {path:'perfil', component:PerfilEmpresaComponent},

  {path:'**',redirectTo : 'perfil'}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
