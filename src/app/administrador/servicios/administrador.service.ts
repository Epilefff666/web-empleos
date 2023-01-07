import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http:HttpClient) { }

  private apiURL = environment.apiURL+'cuentas';

  public obtenerUsuarios(pagina:number,cantidadRegistrosAMostrar:number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());
    return this.http.get<any>(this.apiURL,{observe:'response',params})
  }

}
