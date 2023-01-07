import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AdministradorService } from '../servicios/administrador.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})
export class AdministrarUsuariosComponent implements OnInit {

  cantidadTotalRegistros:number=0;
  cantidadRegistrosAMostrar:number=2;
  PaginaActual:number =1;
  listaUsuarios!:any;
  constructor(
    private administradorService:AdministradorService,
    private location:Location,
    private activatedRouter:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
    this.leerValoresUrl();
    this.cargarUsuarios(this.PaginaActual,this.cantidadRegistrosAMostrar);
  }

  cargarUsuarios(pagina:number,cantidadRegistrosAMostrar:number){
    this.administradorService.obtenerUsuarios(pagina,cantidadRegistrosAMostrar)
    .subscribe( usuarios =>{
      this.listaUsuarios = usuarios.body;
      this.cantidadTotalRegistros = usuarios.headers.get("cantidadTotalRegistros");
    })
  }

  columnas = ['No','Id','Email','Rol']

  private escribirParametrosBusquedaEnUrl(){
    var queryStrings=[];    
    queryStrings.push(`Pagina=${this.PaginaActual}`);
    

    this.location.replaceState('administrar-usuarios',queryStrings.join('&'));
  }
  private leerValoresUrl(){
    this.activatedRouter.queryParams
    .subscribe((params:Params)=>{
      var objeto:any ={};
      if(params['Pagina']){
        this.PaginaActual = params['Pagina'];
      }
      this.cargarUsuarios(this.PaginaActual,this.cantidadRegistrosAMostrar);
    })
  }

  actualizarPaginacion(evento:PageEvent){
    this.PaginaActual = evento.pageIndex +1;
    this.cantidadRegistrosAMostrar = evento.pageSize;
    this.cargarUsuarios(this.PaginaActual,this.cantidadRegistrosAMostrar);
    this.escribirParametrosBusquedaEnUrl();
  }
}
