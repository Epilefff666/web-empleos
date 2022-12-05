import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { credencialesUsuario, respuestaAutenticacion } from '../../Compartido/interfaces/compartido.interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private httpClient:HttpClient) { }

  apiURL = environment.apiURL + 'cuentas'

  estaLogueado():boolean{
    return true;
  }

  obtenerRol():string{
    /* return 'empresas'; */
    /* return 'postulantes'; */
    /* return 'administrador'; */
    return ' ';
  }

  registrar(credenciales:credencialesUsuario): Observable<respuestaAutenticacion>{ 
    return this.httpClient.post<respuestaAutenticacion>(this.apiURL+'/crear',credenciales);

  }

}
