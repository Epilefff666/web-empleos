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

  private apiURL = environment.apiURL + 'inicio';

  public Obtener_ofertas_recientes(): Observable<ofertas_recientesDTO[]>{
    return this.http.get<ofertas_recientesDTO[]>(this.apiURL);
    
  }

  /* public Obtener_todas_las_ofertas():Observable<> */
}
