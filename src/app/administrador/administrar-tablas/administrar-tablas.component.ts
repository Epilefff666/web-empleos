import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AdministradorService } from '../servicios/administrador.service';

@Component({
  selector: 'app-administrar-tablas',
  templateUrl: './administrar-tablas.component.html',
  styleUrls: ['./administrar-tablas.component.css']
})
export class AdministrarTablasComponent implements OnInit {

  estados!:any[];
  categorias!:any[];

  cantidadTotalRegistros1:number=0;
  cantidadRegistrosAMostrar1=10;
  paginaActual1=1;

  cantidadTotalRegistros2:number=0;
  cantidadRegistrosAMostrar2=10;
  paginaActual2=1;


  constructor(
    private administradorService:AdministradorService
  ) { }

  ngOnInit(): void {
    this.cargarCategorias(this.paginaActual1,this.cantidadRegistrosAMostrar1);
    this.cargarEstados(this.paginaActual2,this.cantidadRegistrosAMostrar2)
  }

  cargarCategorias(pagina:number,cantidadRegistrosAMostrar:number){
    this.administradorService.obtenerCategorias(pagina,cantidadRegistrosAMostrar)
    .subscribe( valor =>{
      this.categorias = valor.body;
      this.cantidadTotalRegistros1 = valor.headers.get("cantidadTotalRegistros");
    })
  }

  cargarEstados(pagina:number,cantidadRegistrosAMostrar:number){
    this.administradorService.obtenerEstados(pagina,cantidadRegistrosAMostrar)
    .subscribe( valor =>{
      this.estados = valor.body;
      this.cantidadTotalRegistros2 =  valor.headers.get("cantidadTotalRegistros");
    })
  }

  columnas_categorias = ['Id','Nombre'];
  columnas_estados = ['Id','Nombre'];

  actualizarPaginacion1(evento:PageEvent){
    
  }
  actualizarPaginacion2(evento:PageEvent){

  }
}
