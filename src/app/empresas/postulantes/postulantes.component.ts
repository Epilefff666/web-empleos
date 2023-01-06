import { Component, OnInit } from '@angular/core';
import { parsearErroresAPI } from 'src/app/utilidades/Utilidades';
import { EmpresasService } from '../servicios/empresas.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarPostulacionComponent } from 'src/app/Compartido/confirmar-postulacion/confirmar-postulacion.component';

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
    private empresasService:EmpresasService,
    public dialog : MatDialog
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
      /* console.log(this.postulantes) */
    },errores => this.errores = parsearErroresAPI(errores))
  }

  actualizarPaginacion(event:PageEvent){
    this.PaginaActual = event.pageIndex +1;
    this.cantidadRegistrosAMostrar = event.pageSize;
    this.cargarPostulantes(this.idPerfil,this.PaginaActual,this.cantidadRegistrosAMostrar)
  }

  openDialog(postulanteId:number,publicacionId:number):void{
    const dialogRef = this.dialog.open(ConfirmarPostulacionComponent,{
      width:'350px',
      data:'¿Está seguro que desea rechazar a este postulante?'
    });
    dialogRef.afterClosed()
    .subscribe( response =>{
      if(response){
        this.rechazarPostulante(postulanteId,publicacionId)
      }
    })
  }

  rechazarPostulante(postulanteId:number,publicacionId:number){
/*     console.log(postulanteId,publicacionId) */
    this.empresasService.rechazarPostulante(postulanteId,publicacionId,5)
    .subscribe(() =>{
        console.log('Postulante rechazado');
        this.cargarPostulantes(this.idPerfil,this.PaginaActual,this.cantidadRegistrosAMostrar)
    })
  }
}
