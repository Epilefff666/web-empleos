import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompartidosService } from '../servicios/compartidos.service';
import { categoriasDTO, ofertas_publicadasDTO } from '../interfaces/compartido.interfaces';

@Component({
  selector: 'app-buscar-empleo',
  templateUrl: './buscar-empleo.component.html',
  styleUrls: ['./buscar-empleo.component.css']
})
export class BuscarEmpleoComponent implements OnInit {

  prueba1:any[]=[1,2,3]
  prueba2:any[]=[1,2,3]

  categorias:categoriasDTO[]=[];
  Ofertas1: ofertas_publicadasDTO[] = [] ;
  Ofertas2: ofertas_publicadasDTO[] = [] ;

  constructor(private compartidosService:CompartidosService,private router:Router) { }

  ngOnInit(): void {
    this.compartidosService.Obtener_categorias()
    .subscribe((categorias)=>{
      this.categorias=categorias;
    })
    this.compartidosService.Obtener_ofertas()
    .subscribe( ofertas => {
      for( let i=0 ; i< ofertas.length ; i++){
        console.log(ofertas[i])
        if(i%2 == 0){
         this.Ofertas1.push(ofertas[i]) 
        }
        else{
          this.Ofertas2.push(ofertas[i])
        }
      }
    }, error => console.error(error));

  }

  navegar(url:string){
    this.router.navigate([url]);
  }

}
