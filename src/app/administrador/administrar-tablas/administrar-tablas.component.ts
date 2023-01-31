import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmarGuardarComponent } from 'src/app/Compartido/confirmar-guardar/confirmar-guardar.component';
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
    private administradorService:AdministradorService,
    public dialog : MatDialog,
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

  columnas_categorias = ['Id','Nombre','Opciones'];
  columnas_estados = ['Id','Nombre'];

  actualizarPaginacion1(evento:PageEvent){
    this.paginaActual1 = evento.pageIndex +1;
    this.cantidadRegistrosAMostrar1 = evento.pageSize;
    this.cargarCategorias(this.paginaActual1,this.cantidadRegistrosAMostrar1);
  }
 /*  actualizarPaginacion2(evento:PageEvent){

  } */

  opendDialog(id:number){
    const dialogRef = this.dialog.open(ConfirmarGuardarComponent,{
      width:'350px',
      data:'¿Está seguro que desea eliminar esta categoria?'
    });
    dialogRef.afterClosed()
    .subscribe( response =>{
      if(response){
        this.eliminarCategoria(id);
      }
    })
  }

  eliminarCategoria(id:number){
    this.administradorService.eliminarCategoria(id)
    .subscribe(()=>{
      console.log('Categoria eliminada');
      window.location.reload();
    })
  }
}
