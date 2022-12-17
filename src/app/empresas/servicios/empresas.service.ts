import { Injectable } from '@angular/core';
import { perfil_empresaDTO, perfil_empresa_creacionDTO } from '../interfaces/empresas.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  
  constructor( private http: HttpClient) { }

  private apiURL = environment.apiURL+'empresas';


  public CrearEmpresa( perfil_empresa:perfil_empresa_creacionDTO){
    return this.http.post( this.apiURL +'/crear', perfil_empresa);
  }

  public obtenerEmpresaId( email :string ): Observable<perfil_empresaDTO> {
    return  this.http.get<perfil_empresaDTO>(`${this.apiURL}/${email}`);
  }

  public actualizarEmpresaId(id:number, perfil_empresa: perfil_empresa_creacionDTO){
    return this.http.put(`${this.apiURL}/${id}`,perfil_empresa);
  }

}
