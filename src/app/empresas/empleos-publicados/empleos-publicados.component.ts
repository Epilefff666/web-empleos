import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../servicios/empresas.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-empleos-publicados',
  templateUrl: './empleos-publicados.component.html',
  styleUrls: ['./empleos-publicados.component.css']
})
export class EmpleosPublicadosComponent implements OnInit {

  constructor( private empresasService:EmpresasService,
    private router:Router) { }
  publicaciones!:any[] 
  publicaciones_vencidas!:any[];
  id_empresa = Number(localStorage.getItem('perfilID')) 

  cantidadTotalRegistros1:number = 0;
  cantidadRegistrosAMostrar1:number = 2;
  PaginaActual1=1;
  cantidadTotalRegistros2:number = 0;
  cantidadRegistrosAMostrar2:number = 2;
  PaginaActual2=1;


  ngOnInit(): void {
    this.cargarPublicaciones(this.id_empresa,this.PaginaActual1,this.cantidadRegistrosAMostrar1)
    this.cargarPublicacionesVencidas(this.id_empresa,this.PaginaActual2,this.cantidadRegistrosAMostrar2)

    /* this.empresasService.obtenerEmpleosEmpresa(this.id_empresa,1,4)
    .subscribe( valor => {
      this.publicaciones = valor.body;
      console.log(this.publicaciones)
    })
    this.empresasService.obtenerEmpleosVencidosEmpresa(this.id_empresa,1,4)
    .subscribe( valor => {
      this.publicaciones_vencidas = valor.body;
      console.log(this.publicaciones)
    }) */
  }

  cargarPublicaciones(id:number,pagina:number,cantidadDeRegistros:number){
    this.empresasService.obtenerEmpleosEmpresa(id,pagina,cantidadDeRegistros)
    .subscribe( valor => {
      this.publicaciones = valor.body;
      this.cantidadTotalRegistros1 = valor.headers.get("cantidadTotalRegistros")    
    })
  }

  cargarPublicacionesVencidas(id:number,pagina:number,cantidadDeRegistros:number){
    this.empresasService.obtenerEmpleosVencidosEmpresa(id,pagina,cantidadDeRegistros)
    .subscribe( valor => {
      this.publicaciones_vencidas = valor.body;
      this.cantidadTotalRegistros2 = valor.headers.get("cantidadTotalRegistros")
    })
  }
  

  actualizarPaginacion1(event:PageEvent){
    this.PaginaActual1 = event.pageIndex +1;
    this.cantidadRegistrosAMostrar1 = event.pageSize;
    this.cargarPublicaciones(this.id_empresa,this.PaginaActual1,this.cantidadRegistrosAMostrar1)
  }


  actualizarPaginacion2(event:PageEvent){
    this.PaginaActual2 = event.pageIndex +1;
    this.cantidadRegistrosAMostrar2 = event.pageSize;
    this.cargarPublicacionesVencidas(this.id_empresa,this.PaginaActual2,this.cantidadRegistrosAMostrar2)
  }

}
