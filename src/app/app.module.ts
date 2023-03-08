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
import { MostrarErroresComponent } from './Compartido/mostrar-errores/mostrar-errores.component';
import { RouterModule } from '@angular/router';
import { ConfirmarPostulacionComponent } from './Compartido/confirmar-postulacion/confirmar-postulacion.component';
import { MensajePostuladoComponent } from './Compartido/mensaje-postulado/mensaje-postulado.component';
import { ConfirmarGuardarComponent } from './Compartido/confirmar-guardar/confirmar-guardar.component';

import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module, RecaptchaModule, RecaptchaFormsModule } from "ng-recaptcha";
import { environment } from 'src/environments/environment';
import { DialogFechasComponent } from './Compartido/dialog-fechas/dialog-fechas.component';


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
    MostrarErroresComponent,
    ConfirmarPostulacionComponent,
    MensajePostuladoComponent,
    ConfirmarGuardarComponent,
    DialogFechasComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RecaptchaV3Module,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  entryComponents:[ConfirmarPostulacionComponent], 
  providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha.key }],
  bootstrap: [AppComponent]
})
export class AppModule { }
