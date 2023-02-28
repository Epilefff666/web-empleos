import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ofertas_publicadasDTO,  categoriasDTO } from '../interfaces/compartido.interfaces';
import { Params } from '@angular/router';
import { AppModule } from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class CompartidosService {

  constructor(private http: HttpClient) { }

  formulario:any;
  private enviarFormSubject = new Subject<any>();
  eniviarformObservable = this.enviarFormSubject.asObservable();

  private apiURL = environment.apiURL + 'inicio';

  public Obtener_ofertas(pagina:number, cantidadregistrosAMostrar:number,palabraClave:string,categroia:string,empresa:string): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadregistrosAMostrar.toString());
    params = params.append('palabraClave',palabraClave);
    params = params.append('categoria',categroia);
    params = params.append('nombre_empresa',empresa);

    return this.http.get<ofertas_publicadasDTO[]>(this.apiURL+'/ofertas-filtro', {observe:'response',params});
  }

    public Obtener_ofertas2(pagina:number, cantidadregistrosAMostrar:number,palabraClave:string): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadregistrosAMostrar.toString());
    params = params.append('palabraClave',palabraClave);


    return this.http.get<ofertas_publicadasDTO[]>(this.apiURL+'/ofertas-filtro2', {observe:'response',params});
  }



  public Obtener_categorias():Observable<categoriasDTO[]>{
    return this.http.get<categoriasDTO[]>(this.apiURL+'/categorias');
  }

  public enviarForm(formulario:any){
    this.formulario = formulario;
    this.enviarFormSubject.next(formulario);
  }
}
