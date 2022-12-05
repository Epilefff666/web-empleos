import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ofertas_recientesDTO, todas_las_ofertasDTO, detalle_empleoDTO } from '../interfaces/compartido.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompartidosService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'inicio';

  public Obtener_ofertas_recientes(): Observable<ofertas_recientesDTO[]>{
    return this.http.get<ofertas_recientesDTO[]>(this.apiURL);
  }

  public Obtener_todas_las_ofertas(): Observable<todas_las_ofertasDTO[]>{
    return this.http.get<todas_las_ofertasDTO[]>(this.apiURL+'/buscar-empleo')
  }

  public Obtener_detalle_empleo(id:number): Observable<detalle_empleoDTO>{
    return this.http.get<detalle_empleoDTO>(this.apiURL+'/detalle-empleo/'+`${id}`)
  }
}
