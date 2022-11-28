import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CompartidosService } from '../servicios/compartidos.service';
import { ofertas_recientesDTO } from '../interfaces/compartido.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  options: string[]=['ingenieria','ventas','administración'];
  Ofertas_recientes1: ofertas_recientesDTO[] = [] ;
  Ofertas_recientes2: ofertas_recientesDTO[] = [] ;

  constructor(private compartidosService : CompartidosService) {}

  ngOnInit(): void {

    this.compartidosService.Obtener_ofertas_recientes()
    .subscribe( ofertas_recientes => {
      for( let i=0 ; i< ofertas_recientes.length ; i++){
        console.log(ofertas_recientes[i])
        if(i%2 == 0){
         this.Ofertas_recientes1.push(ofertas_recientes[i]) 
        }
        else{
          this.Ofertas_recientes2.push(ofertas_recientes[i])
        }
      }
    }, error => console.error(error));
    } 
  }

