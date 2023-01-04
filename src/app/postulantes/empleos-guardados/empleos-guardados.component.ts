import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmarGuardarComponent } from '../../Compartido/confirmar-guardar/confirmar-guardar.component';

@Component({
  selector: 'app-empleos-guardados',
  templateUrl: './empleos-guardados.component.html',
  styleUrls: ['./empleos-guardados.component.css']
})
export class EmpleosGuardadosComponent implements OnInit {
  empleosGuardados:any[]=[];
  perfilId!:any;
  datos!:any;
  datosPaginador!:any

  cantidadTotalRegistros:number = 0;
  PaginaActual:number = 1
  cantidadRegistrosAMostrar:number = 4;


  constructor(
    public dialog : MatDialog
  ) { }

  ngOnInit(): void {


      this.cargarDatos(this.PaginaActual,this.cantidadRegistrosAMostrar);


  } 



  cargarDatos(pagina:number,cantidad:number){
    this.perfilId = localStorage.getItem('perfilID')
    this.datos = localStorage.getItem(this.perfilId)
    this.datosPaginador =JSON.parse(this.datos)
    if(pagina === 1){
      this.empleosGuardados = this.datosPaginador.slice(pagina -1 ,cantidad)
    }else{
      pagina = (pagina * cantidad) - cantidad
      cantidad = pagina + cantidad
      this.empleosGuardados = this.datosPaginador.slice(pagina ,cantidad )
    }
    this.cantidadTotalRegistros = this.datosPaginador.length
  }

  actualizarPaginacion(evento:PageEvent){
    this.cantidadRegistrosAMostrar = evento.pageSize;
    this.PaginaActual = evento.pageIndex +1;
    this.cargarDatos(this.PaginaActual,this.cantidadRegistrosAMostrar)
  }

  openDialog(id:number):void{
    const dialogRef = this.dialog.open(ConfirmarGuardarComponent,{
      width:'350px',
      data:'¿Está seguro que desea eliminar el empleo guardado?'
    });
    dialogRef.afterClosed()
    .subscribe( response =>{
      if(response){
        this.eliminarGuardado(id);
      }
    })
  }

  eliminarGuardado(id:number){
    for(let i= 0 ;i<this.datosPaginador.length;i++){
      if(this.datosPaginador[i].id == id){
        this.datosPaginador.splice(i,1)
        localStorage.setItem(this.perfilId,JSON.stringify(this.datosPaginador))
      }
    }
    this.cargarDatos(this.PaginaActual,this.cantidadRegistrosAMostrar)
  } 

}
