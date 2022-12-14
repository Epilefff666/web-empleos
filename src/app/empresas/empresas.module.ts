import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicarEmpleoComponent } from './publicar-empleo/publicar-empleo.component';
import { PostulantesComponent } from './postulantes/postulantes.component';
import { EmpleosPublicadosComponent } from './empleos-publicados/empleos-publicados.component';
import { PerfilEmpresaComponent } from './perfil-empresa/perfil-empresa.component';
import { EmpresasRoutingModule } from './empresas-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    PublicarEmpleoComponent,
    PostulantesComponent,
    EmpleosPublicadosComponent,
    PerfilEmpresaComponent
  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class EmpresasModule { }
