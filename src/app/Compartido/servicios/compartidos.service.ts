import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ofertas_recientesDTO } from '../interfaces/compartido.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompartidosService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'EmpleosPublicados';

  public Obtener_ofertas_recientes(): Observable<ofertas_recientesDTO[]>{
    return this.http.get<ofertas_recientesDTO[]>(this.apiURL+'/ofertas');
    
   /*  [{
    id_empleo_publicado : 1 ,
    puesto_empleo : 'administrador',
    nombre_empresa : 'epistore',
    fecha_publicacion :new Date() ,
    id_perfil_empresa : 1,
    id_estado : 1
    }]; */
  }
}
