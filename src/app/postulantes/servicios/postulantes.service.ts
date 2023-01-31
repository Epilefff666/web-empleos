import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { perfil_postulante_creacionDTO, perfil_postulanteDTO, postulaciones_CreacionDTO, postulacionesDTO } from '../interfaces/postulantes.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostulantesService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL+'postulantes';
  private apiURLpostulaciones = environment.apiURL+'postulaciones' 
/* ---------------------------postulaciones ---------------------------*/

  public obtenerPostulaciones(postulanteId:number,pagina:number,cantidadregistrosAMostrar:number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadregistrosAMostrar.toString());
    return this.http.get<any>(`${this.apiURLpostulaciones}/${postulanteId}`, {observe:'response',params})
  }


  public obtnerPostulacionId(publicacionId:number,postulanteId:number):Observable<postulacionesDTO>{
    return this.http.get<postulacionesDTO>(`${this.apiURLpostulaciones}/postulado/${publicacionId}/${postulanteId}`);
  }


  public postularEmpleo(postulacion:postulaciones_CreacionDTO){
    return this.http.post(this.apiURLpostulaciones+'/crear',postulacion);
  }

  public EliminarPostulacion(perfil_postulanteId:number,postulacionesId:number){
    return this.http.delete(`${this.apiURLpostulaciones}/${'Delete'}/${perfil_postulanteId}/${postulacionesId}`)
  }

/* -------------------------  Perfil --------------------------------*/
  
  public obtenerPerfilEmail(email:string):Observable<perfil_postulanteDTO>{
    return this.http.get<perfil_postulanteDTO>(`${this.apiURL}/${email}`);
  }

  public crearPostulante(perfil_postulante:perfil_postulante_creacionDTO){
    const formData = this.construirFormData(perfil_postulante);
    return this.http.post(this.apiURL+'/crear',formData);
  }

  public EditarPostulante(id:number,perfil_postulante:perfil_postulante_creacionDTO){
    const formData = this.construirFormData(perfil_postulante);
    return this.http.put(`${this.apiURL}/${id}`,formData);
  }


  private construirFormData(perfil_postulante: perfil_postulante_creacionDTO): FormData{
    const formData = new FormData();
    let fecha_nacimiento:string
    if(typeof perfil_postulante.fecha_nacimiento !== "string"){
       fecha_nacimiento = perfil_postulante.fecha_nacimiento.toUTCString();
       formData.append("fecha_nacimiento", fecha_nacimiento);
    }else{
        formData.append("fecha_nacimiento", perfil_postulante.fecha_nacimiento);
    }
    
    formData.append("nombres",perfil_postulante.nombres);
    formData.append("apellidos",perfil_postulante.apellidos);
    formData.append("sexo",perfil_postulante.sexo);
    formData.append("numero_documento",perfil_postulante.numero_documento);
    
    formData.append("profesion_ocupacion",perfil_postulante.profesion_ocupacion);
    formData.append("descripcion_postulante",perfil_postulante.descripcion_postulante);
    formData.append("foto_perfil",perfil_postulante.foto_perfil);
    formData.append("cv",perfil_postulante.cv);
    formData.append("celular",perfil_postulante.celular);
    formData.append("correo",perfil_postulante.correo);
    formData.append("habilidad_blanda1",perfil_postulante.habilidad_blanda1);
    formData.append("habilidad_blanda2",perfil_postulante.habilidad_blanda2);
    formData.append("habilidad_blanda3",perfil_postulante.habilidad_blanda3);
    formData.append("habilidad_blanda4",perfil_postulante.habilidad_blanda4);
    formData.append("habilidad_blanda5",perfil_postulante.habilidad_blanda5);
    formData.append("habilidad_tecnica1",perfil_postulante.habilidad_tecnica1);
    formData.append("habilidad_tecnica2",perfil_postulante.habilidad_tecnica2);
    formData.append("habilidad_tecnica3",perfil_postulante.habilidad_tecnica3);
    formData.append("habilidad_tecnica4",perfil_postulante.habilidad_tecnica4);
    formData.append("habilidad_tecnica5",perfil_postulante.habilidad_tecnica5);
    formData.append("facebook",perfil_postulante.facebook);
    formData.append("instagram",perfil_postulante.instagram);
    formData.append("linkedin",perfil_postulante.linkedin);
    formData.append("tiktok",perfil_postulante.tiktok);
    formData.append("userId",perfil_postulante.userId);
    return formData;
  }



}
