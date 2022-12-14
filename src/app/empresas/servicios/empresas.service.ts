import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { perfil_empresaDTO } from '../interfaces/empresas.interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private apiURL = environment.apiURL + 'empresas';
  constructor( private http: HttpClient) { }

  public CrearEmpresa( perfil_empresa:perfil_empresaDTO){
    return this.http.post(this.apiURL, perfil_empresa);
  }
}
