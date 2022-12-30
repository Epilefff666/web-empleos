import { Component, OnInit } from '@angular/core';
import { parsearErroresAPI } from 'src/app/utilidades/Utilidades';
import { EmpresasService } from '../servicios/empresas.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-postulantes',
  templateUrl: './postulantes.component.html',
  styleUrls: ['./postulantes.component.css']
})
export class PostulantesComponent implements OnInit {

  idPerfil:number =Number(localStorage.getItem('perfilID'));
  postulantes:any[]=[];
/*   postulantes1:any[]=[];
  postulantes2:any[]=[]; */
  errores:any[]=[];

  PaginaActual:number = 1;
  cantidadTotalRegistros:number = 0;
  cantidadRegistrosAMostrar:number =4;
  constructor(
    private empresasService:EmpresasService
  ) { }

  ngOnInit(): void {
    this.cargarPostulantes(this.idPerfil,this.PaginaActual,this.cantidadRegistrosAMostrar)
  }

  verPDF(value:string){
    window.open(value);
  }

  cargarPostulantes(id:number,pagina:number,cantidadRegistrosAMostrar:number){
    this.empresasService.obtenerPostulantesEmpresa(id,pagina,cantidadRegistrosAMostrar)
    .subscribe( value =>{  
      this.postulantes= value.body
      this.cantidadTotalRegistros = value.headers.get("cantidadTotalRegistros")
    },errores => this.errores = parsearErroresAPI(errores))
  }

  actualizarPaginacion(event:PageEvent){
    this.PaginaActual = event.pageIndex +1;
    this.cantidadRegistrosAMostrar = event.pageSize;
    this.cargarPostulantes(this.idPerfil,this.PaginaActual,this.cantidadRegistrosAMostrar)
  }
}
