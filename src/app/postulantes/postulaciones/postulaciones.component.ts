import { Component, OnInit } from '@angular/core';
import { PostulantesService } from '../servicios/postulantes.service';
import { parsearErroresAPI } from '../../utilidades/Utilidades';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {

  constructor(
    private postulantesService:PostulantesService
  ) { }
    idPerfil!:number;
    postulaciones!:any[]
    cantidadTotalRegistros=0;
    cantidadRegistrosAMostrar=4;
    paginaActual=1;


  ngOnInit(): void {
    this.idPerfil = Number(localStorage.getItem('perfilID'));
    this.cargarpostulaciones(this.idPerfil,this.paginaActual,this.cantidadRegistrosAMostrar)

  }

  errores:any[]=[];
  cargarpostulaciones(id:number,pagina:number,cantidadRegistrosAmostrar:number){
    
    this.postulantesService.obtenerPostulaciones(id,pagina,cantidadRegistrosAmostrar)
    .subscribe( postulaciones =>{
      this.postulaciones =postulaciones.body
      this.cantidadTotalRegistros = postulaciones.headers.get("cantidadTotalRegistros")
      console.log(this.postulaciones)
    }, errores => this.errores = parsearErroresAPI(errores) )
  }

  actualizarPaginacion(event:PageEvent):void{
    this.paginaActual = event.pageIndex +1;
    this.cantidadRegistrosAMostrar = event.pageSize;
    this.cargarpostulaciones(this.idPerfil,this.paginaActual,this.cantidadRegistrosAMostrar)
  }

}
