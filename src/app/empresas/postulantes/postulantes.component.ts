import { Component, OnInit } from '@angular/core';
import { parsearErroresAPI } from 'src/app/utilidades/Utilidades';
import { EmpresasService } from '../servicios/empresas.service';

@Component({
  selector: 'app-postulantes',
  templateUrl: './postulantes.component.html',
  styleUrls: ['./postulantes.component.css']
})
export class PostulantesComponent implements OnInit {

  idPerfil:number =Number(localStorage.getItem('perfilID'));
  postulantes1:any[]=[];
  postulantes2:any[]=[];
  errores:any[]=[];

  constructor(
    private empresasService:EmpresasService
  ) { }

  ngOnInit(): void {
    
    this.empresasService.obtenerPostulantesEmpresa(this.idPerfil)
    .subscribe( value =>{  
      console.log(value)
      for( let i=0 ; i< value.length ; i++){
        if(i%2 == 0){
         this.postulantes1.push(value[i]) 
         console.log(this.postulantes1)
        }
        else{
          this.postulantes2.push(value[i])
          console.log(this.postulantes2)
        }
      }
    },errores => this.errores = parsearErroresAPI(errores))

  }

  verPDF(value:string){
    window.open(value);
  }

}
