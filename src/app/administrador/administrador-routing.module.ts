import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarPublicacionesComponent } from './administrar-publicaciones/administrar-publicaciones.component';
import { AdministrarTablasComponent } from './administrar-tablas/administrar-tablas.component';
import { AdministrarUsuariosComponent } from './administrar-usuarios/administrar-usuarios.component';
import { InformeDeDatosComponent } from './informe-de-datos/informe-de-datos.component';
import { RegistroAdministradorComponent } from './registro-administrador/registro-administrador.component';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';

const routes: Routes =[
  {path:'administrar-publicaciones',component:AdministrarPublicacionesComponent},
  {path:'administrar-tablas',component:AdministrarTablasComponent},
  {path:'administrar-tablas/crear-categoria',component:CrearCategoriaComponent},
  {path:'administrar-tablas/editar-categoria/:id',component:EditarCategoriaComponent},
  {path:'administrar-usuarios',component:AdministrarUsuariosComponent},
  {path:'administrar-usuarios/registrar-administrador',component:RegistroAdministradorComponent},
  {path:'informe-de-datos',component:InformeDeDatosComponent},
  {path:'**', redirectTo:'inicio'}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
