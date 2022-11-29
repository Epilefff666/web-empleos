import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ofertas_recientesDTO } from '../interfaces/compartido.interfaces';
import { CompartidosService } from '../servicios/compartidos.service';

@Component({
  selector: 'app-buscar-empleo',
  templateUrl: './buscar-empleo.component.html',
  styleUrls: ['./buscar-empleo.component.css']
})
export class BuscarEmpleoComponent implements OnInit {

  options: string[]=['ingenieria','ventas','administración'];
  Ofertas_recientes1: ofertas_recientesDTO[] = [] ;
  Ofertas_recientes2: ofertas_recientesDTO[] = [] ;

  constructor(private compartidosService:CompartidosService,private router:Router) { }

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

  navegar(url:string){
    this.router.navigate([url]);
  }

}
