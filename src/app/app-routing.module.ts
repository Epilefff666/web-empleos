import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarEmpleoComponent } from './Compartido/buscar-empleo/buscar-empleo.component';
import { HomeComponent } from './Compartido/home/home.component';
import { IngresarComponent } from './Compartido/ingresar/ingresar.component';
import { RegistrarseComponent } from './Compartido/registrarse/registrarse.component';
import { DetalleEmpleoComponent } from './Compartido/detalle-empleo/detalle-empleo.component';
import { EsAdministradorGuard } from './seguridad/guards/es-administrador.guard';
import { EsEmpresaGuard } from './seguridad/guards/es-empresa.guard';
import { EsPostulanteGuard } from './seguridad/guards/es-postulante.guard';
import { RegistroEmpresasComponent } from './Compartido/registrarse/registro-empresas/registro-empresas.component';
import { RegistroPostulantesComponent } from './Compartido/registrarse/registro-postulantes/registro-postulantes.component';


const routes: Routes = [

  {path:'inicio',component:HomeComponent},

  {path:'ingresar',component:IngresarComponent},

  {path:'registrarse',component:RegistrarseComponent},

  {path:'registrarse/registro-empresas',component:RegistroEmpresasComponent},

  {path:'registrarse/registro-postulantes', component:RegistroPostulantesComponent},

  {path:'buscar-empleo',component:BuscarEmpleoComponent},

  {path:'detalle-empleo/:id_empleo', component:DetalleEmpleoComponent},

  {path:'empresas',loadChildren:() => import('./empresas/empresas.module').then( m => m.EmpresasModule), canActivate:[EsEmpresaGuard] },

  {path:'postulantes',loadChildren:() => import('./postulantes/postulantes.module').then( m => m.PostulantesModule), canActivate:[EsPostulanteGuard] },

  {path:'administrador',loadChildren:() => import('./administrador/administrador.module').then( m => m.AdministradorModule), canActivate:[EsAdministradorGuard] },

  {path:'**',redirectTo : 'inicio'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
