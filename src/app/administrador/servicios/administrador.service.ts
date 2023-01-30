import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http:HttpClient) { }

  /*--------------------------------------------- Usuarios -----------------------------------*/


  private apiURL = environment.apiURL+'cuentas';

  public obtenerUsuarios(pagina:number,cantidadRegistrosAMostrar:number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());
    return this.http.get<any>(this.apiURL,{observe:'response',params})
  }

  /* ----------------------------------------Categorias y estados --------------------------------*/

  private apiURLinicio =  environment.apiURL +'inicio';

  public obtenerCategorias(pagina:number,cantidadRegistrosAMostrar:number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());
    return this.http.get<any>(this.apiURLinicio+'/categorias-paginado',{observe:'response',params})
  }

  public obtenerEstados(pagina:number,cantidadRegistrosAMostrar:number):Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());
    return this.http.get<any>(this.apiURLinicio+'/estados-paginado',{observe:'response',params})
  }

  /*----------------------------------------- reportes ----------------------------------------*/

  private apiURLreporte =  environment.apiURL +'reporte';

  public obtenerReporte():Observable<any>{
    return this.http.get<any>(this.apiURLreporte)
  }
  public obtenerReporteUsuaios(id:string,rol:string):Observable<any>{
    return this.http.get<any>(`${this.apiURLreporte}/${'usuarios'}/${id}/${rol}`);
  }
  public obtenerReportePublicacion(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiURLreporte}/${'publicacion'}/${id}`);
  }
  public obtenerReportePostulantes(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiURLreporte}/${'postulantes'}/${id}`);
  }

  /* -------------------------------------Backups----------------------- */

  private apiUrlBackup = environment.apiURL +'backup';

  public obtenerBackup():any{
    return this.http.get(this.apiUrlBackup);
  }
}
