import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CompartidosService } from '../servicios/compartidos.service';
import { Router} from '@angular/router';
import { SeguridadService } from '../../seguridad/servicios/seguridad.service';
import { ofertas_publicadasDTO, categoriasDTO } from '../interfaces/compartido.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  

  nombre:string = '';
  categorias:categoriasDTO[]=[];
  Ofertas1: ofertas_publicadasDTO[] = [] ;
  Ofertas2: ofertas_publicadasDTO[] = [] ;


  constructor(private compartidosService : CompartidosService, 
    private router:Router,
    private seguridadService:SeguridadService) {}

  ngOnInit(): void {

    this.nombre = this.seguridadService.obtenerCampoJWT('email');
    this.compartidosService.Obtener_categorias()
    .subscribe((categorias)=>{
      this.categorias = categorias;
    })
    this.compartidosService.Obtener_ofertas()
    .subscribe( ofertas => {
      console.log(ofertas)
      for( let i=0 ; i< 6 ; i++){
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

