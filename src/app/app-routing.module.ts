import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Compartido/home/home.component';
import { IngresarComponent } from './Compartido/ingresar/ingresar.component';
import { RegistrarseComponent } from './Compartido/registrarse/registrarse.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'ingresar',component:IngresarComponent},
  {path:'registrarse',component:RegistrarseComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
