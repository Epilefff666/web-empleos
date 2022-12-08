import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { credencialesUsuario, respuestaAutenticacion } from '../../Compartido/interfaces/compartido.interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { parsearErroresAPI } from '../../utilidades/Utilidades';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private httpClient:HttpClient , private router:Router) { }

  apiURL = environment.apiURL + 'cuentas'

  private readonly llaveToken='token';
  private readonly llaveExpiracion='token-expiracion';
  private readonly campoRol = 'role';

  estaLogueado():boolean{
    const token = localStorage.getItem(this.llaveToken)
    if(!token){
      return false;
    }
  
    const expiracion =  localStorage.getItem(this.llaveExpiracion);
    const expiracionFecha = new Date(expiracion!);
    if( expiracionFecha <= new Date() ){
      this.logOut();
      return false;
    }
    return true;
  }

  logOut(){
    localStorage.removeItem(this.llaveToken );
    localStorage.removeItem(this.llaveExpiracion);
    
    
  }
  obtenerRol():string{
    /* return 'empresas'; */
    /* return 'postulantes'; */
    /* return 'administrador'; */
    return this.obtenerCampoJWT(this.campoRol)
  }

  obtenerCampoJWT(campo:string):string{
    const token = localStorage.getItem(this.llaveToken);
    if(!token){ return ''}
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }

  registrar(credenciales:credencialesUsuario): Observable<respuestaAutenticacion>{ 
    
    return this.httpClient.post<respuestaAutenticacion>(this.apiURL+'/crear',credenciales);
    
  }

  login(credenciales:credencialesUsuario): Observable<respuestaAutenticacion>{ 
    return this.httpClient.post<respuestaAutenticacion>(this.apiURL+'/login',credenciales);

  }

  guardarToken(respuestaAutenticacion: respuestaAutenticacion){
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(this.llaveExpiracion, respuestaAutenticacion.expiracion.toString());
  }

}
