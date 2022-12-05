import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarPublicacionesComponent } from './administrar-publicaciones/administrar-publicaciones.component';
import { AdministrarTablasComponent } from './administrar-tablas/administrar-tablas.component';
import { AdministrarUsuariosComponent } from './administrar-usuarios/administrar-usuarios.component';
import { InformeDeDatosComponent } from './informe-de-datos/informe-de-datos.component';

const routes: Routes =[
  {path:'administrar-publicaciones',component:AdministrarPublicacionesComponent},
  {path:'administrar-tablas',component:AdministrarTablasComponent},
  {path:'administrar-usuarios',component:AdministrarUsuariosComponent},
  {path:'informe-de-datos',component:InformeDeDatosComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
