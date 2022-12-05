import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './Compartido/menu/menu.component';
import { HomeComponent } from './Compartido/home/home.component';
import { RegistrarseComponent } from './Compartido/registrarse/registrarse.component';
import { IngresarComponent } from './Compartido/ingresar/ingresar.component';
import { BuscarEmpleoComponent } from './Compartido/buscar-empleo/buscar-empleo.component';
import { DetalleEmpleoComponent } from './Compartido/detalle-empleo/detalle-empleo.component';
import { AutorizadoComponent } from './seguridad/autorizado/autorizado.component';
import { RegistroEmpresasComponent } from './Compartido/registrarse/registro-empresas/registro-empresas.component';
import { RegistroPostulantesComponent } from './Compartido/registrarse/registro-postulantes/registro-postulantes.component';
import { PieDePaginaComponent } from './Compartido/pie-de-pagina/pie-de-pagina.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    RegistrarseComponent,
    IngresarComponent,
    BuscarEmpleoComponent,
    DetalleEmpleoComponent,
    AutorizadoComponent,
    RegistroEmpresasComponent,
    RegistroPostulantesComponent,
    PieDePaginaComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
