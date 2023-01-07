import { Injectable } from '@angular/core';
import { perfil_empresaDTO, perfil_empresa_creacionDTO, publicar_empleoDTO, publicar_empleo_creacionDTO, postulantes_empresaDTO, DetallePostulanteDTO } from '../interfaces/empresas.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  
  constructor( private http: HttpClient) { }

  private apiURL = environment.apiURL+'empresas';

  /*  ----------------------------------------------servicios perfil empresa   */

  public CrearEmpresa( perfil_empresa:perfil_empresa_creacionDTO){
    const formData = this.construirFormData(perfil_empresa)
    return this.http.post( this.apiURL +'/crear', formData);
  }

  public obtenerEmpresaEmail( email :string ): Observable<perfil_empresaDTO> {
    return  this.http.get<perfil_empresaDTO>(`${this.apiURL}/${email}`);
  }

  public obtenerEmpresaId( id :number ): Observable<perfil_empresaDTO> {
    return  this.http.get<perfil_empresaDTO>(`${this.apiURL}/perfil/${id}`);
  }

  public actualizarEmpresaId(id:number, perfil_empresa: perfil_empresa_creacionDTO){
    const formData = this.construirFormData(perfil_empresa)
    return this.http.put(`${this.apiURL}/${id}`,formData);
  }





 /* ----------------------------------------servicios publicar empleo */





 private apiURLpublicar = environment.apiURL+'publicaciones'

  public obtnerEmpleoId(id:number):Observable<publicar_empleoDTO>{
    return this.http.get<publicar_empleoDTO>(`${this.apiURLpublicar}/${id}`);
  }



  public obtenerEmpleosEmpresa(id:number,pagina:number, cantidadregistrosAMostrar:number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadregistrosAMostrar.toString());
    return this.http.get<publicar_empleoDTO[]>(`${this.apiURLpublicar}/${'empresa'}/${id}`,{observe:'response',params});
  }

  public obtenerEmpleosVencidosEmpresa(id:number,pagina:number, cantidadregistrosAMostrar:number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadregistrosAMostrar.toString());
    return this.http.get<publicar_empleoDTO[]>(`${this.apiURLpublicar}/${'vencidas/empresa'}/${id}`,{observe:'response',params});
  }



  public publicarEmpleo(publicar_empleo:publicar_empleo_creacionDTO){
    return this.http.post(this.apiURLpublicar+'/crear',publicar_empleo);
  } 

  public editarEmpleo(id:number,publicar_empleo:publicar_empleo_creacionDTO){
    return this.http.put(`${this.apiURLpublicar}/${'editar'}/${id}`,publicar_empleo);
  } 



/* ----------------------------------------------  servicios postulantes */


  
 private apiURLpostulantes = environment.apiURL+'postulantesEmpresa';

 public obtenerPostulantesEmpresa(id:number,pagina:number,cantidadregistrosAMostrar:number):Observable<any>{
  let params = new HttpParams();
  params = params.append('pagina', pagina.toString());
  params = params.append('recordsPorPagina', cantidadregistrosAMostrar.toString());
    return this.http.get<postulantes_empresaDTO[]>(`${this.apiURLpostulantes}/${id}`,{observe:'response',params});
 }
 public obtenerDetallePostulante(postulanteId:number,publicacionId:number):Observable<DetallePostulanteDTO>{
    return this.http.get<DetallePostulanteDTO>(`${this.apiURLpostulantes}/${'detalle-postulante'}/${postulanteId}/${publicacionId}`);
 }

  public rechazarPostulante(postulanteId:number,publicacionId:number,estadoId:number){
    return this.http.put(`${this.apiURLpostulantes}/${'rechazar'}/${postulanteId}/${publicacionId}`,estadoId);
  } 

  
  public aceptarPostulante(postulanteId:number,publicacionId:number,estadoId:number){
    return this.http.put(`${this.apiURLpostulantes}/${'aceptar'}/${postulanteId}/${publicacionId}`,estadoId);
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
