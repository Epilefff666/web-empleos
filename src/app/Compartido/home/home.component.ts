import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { CompartidosService } from '../servicios/compartidos.service';
import { Router} from '@angular/router';
import { SeguridadService } from '../../seguridad/servicios/seguridad.service';
import { ofertas_publicadasDTO, categoriasDTO } from '../interfaces/compartido.interfaces';
import { outputAst } from '@angular/compiler';
import { HttpResponse } from '@angular/common/http';


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
  form!:FormGroup;
  ofertas:any;
  
  constructor(
    private compartidosService : CompartidosService, 
    private router:Router,
    private seguridadService:SeguridadService,
    private formBuilder:FormBuilder) {}


  ngOnInit(): void {

    this.nombre = this.seguridadService.obtenerCampoJWT('email');
    
    this.form = this.formBuilder.group({
      categoria:'',
      palabraClave:''
    })

    this.compartidosService.Obtener_categorias()
    .subscribe((categorias)=>{
      this.categorias = categorias;
    })

    this.compartidosService.Obtener_ofertas(0,0)
    .subscribe( (respuesta:HttpResponse<ofertas_publicadasDTO[]>) => {
     /*  console.log(ofertas) */
     this.ofertas =  respuesta.body;
      for( let i=0 ; i< 6 ; i++){
        if(i%2 == 0){
         this.Ofertas1.push(this.ofertas[i]) 
        }
        else{
          this.Ofertas2.push(this.ofertas[i])
        }
      }
    }, error => console.error(error));
 
    } 



    enviarFormulario(formulario:any){
      this.compartidosService.enviarForm(formulario);
      this.router.navigate(['buscar-empleo'],{queryParams:{categoria:formulario.categoria ,palabraClave:formulario.palabraClave}})
    }
  }

