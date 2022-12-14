import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CompartidosService } from '../servicios/compartidos.service';
import { ofertas_recientesDTO } from '../interfaces/compartido.interfaces';
import { Router} from '@angular/router';
import { SeguridadService } from '../../seguridad/servicios/seguridad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  prueba:any[]=[1,2,3,4,5];
  prueba2:any[]=[1,2,3,4,5];
  nombre:string = '';
  options: string[]=['ingenieria','ventas','administración'];
  Ofertas_recientes1: ofertas_recientesDTO[] = [] ;
  Ofertas_recientes2: ofertas_recientesDTO[] = [] ;


  constructor(private compartidosService : CompartidosService, 
    private router:Router,
    private seguridadService:SeguridadService) {}

  ngOnInit(): void {

    this.nombre = this.seguridadService.obtenerCampoJWT('email');

    this.compartidosService.Obtener_ofertas_recientes()
    .subscribe( ofertas_recientes => {
      for( let i=0 ; i< ofertas_recientes.length ; i++){
        if(i%2 == 0){
         this.Ofertas_recientes1.push(ofertas_recientes[i]) 
        }
        else{
          this.Ofertas_recientes2.push(ofertas_recientes[i])
        }
      }
    }, error => console.error(error));

    } 



    navegar(url:string){
      this.router.navigate([url]);
    }
  }

