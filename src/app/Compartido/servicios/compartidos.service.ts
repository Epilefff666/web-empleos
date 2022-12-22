import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ofertas_publicadasDTO,  categoriasDTO } from '../interfaces/compartido.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompartidosService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'inicio';

  public Obtener_ofertas(): Observable<ofertas_publicadasDTO[]>{
    return this.http.get<ofertas_publicadasDTO[]>(this.apiURL+'/ofertas');
  }

  public Obtener_categorias():Observable<categoriasDTO[]>{
    return this.http.get<categoriasDTO[]>(this.apiURL+'/categorias');
  }
}
