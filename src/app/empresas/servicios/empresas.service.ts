import { Injectable } from '@angular/core';
import { perfil_empresaDTO, perfil_empresa_creacionDTO } from '../interfaces/empresas.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  
  constructor( private http: HttpClient) { }

  private apiURL = environment.apiURL+'empresas';


  public CrearEmpresa( perfil_empresa:perfil_empresa_creacionDTO){
    return this.http.post( this.apiURL +'/crear', perfil_empresa);
  }
}
