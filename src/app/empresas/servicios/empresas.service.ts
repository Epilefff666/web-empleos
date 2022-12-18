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
    const formData = this.construirFormData(perfil_empresa)
    
    return this.http.post( this.apiURL +'/crear', formData);
  }

  public obtenerEmpresaId( email :string ): Observable<perfil_empresaDTO> {
    return  this.http.get<perfil_empresaDTO>(`${this.apiURL}/${email}`);
  }

  public actualizarEmpresaId(id:number, perfil_empresa: perfil_empresa_creacionDTO){
    const formData = this.construirFormData(perfil_empresa)
    return this.http.put(`${this.apiURL}/${id}`,formData);
  }

  private construirFormData(perfil_empresa: perfil_empresa_creacionDTO): FormData{

    const formData = new FormData();
    formData.append("nombre_empresa",perfil_empresa.nombre_empresa);
    formData.append("direccion", perfil_empresa.direccion);
    formData.append("celular",perfil_empresa.celular);
    if(perfil_empresa.telefono){
      formData.append("telefono",perfil_empresa.telefono);
    }
    formData.append("correo",perfil_empresa.correo);
    formData.append("descripcion_empresa",perfil_empresa.descripcion_empresa);
    formData.append("beneficios",perfil_empresa.beneficios);
    if(perfil_empresa.foto_perfil){
      formData.append("foto_perfil",perfil_empresa.foto_perfil);
    }
    formData.append("sector",perfil_empresa.sector);
    if(perfil_empresa.facebook){
      formData.append("facebook",perfil_empresa.facebook);
    }
    if(perfil_empresa.instagram){
      formData.append("instagram",perfil_empresa.instagram);
    }
    if(perfil_empresa.linkedin){
      formData.append("linkedin",perfil_empresa.linkedin);
    }
    if(perfil_empresa.tiktok){
      formData.append("tiktok",perfil_empresa.tiktok);
    }
    formData.append("UserId",perfil_empresa.userId);
   
    return formData;
  }

}
