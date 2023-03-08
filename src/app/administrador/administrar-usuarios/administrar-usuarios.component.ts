import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AdministradorService } from '../servicios/administrador.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as pdfMake from "pdfmake/build/pdfmake";
/* import * as pdfFonts from 'pdfmake/build/vfs_fonts'; */
import { MatDialog } from '@angular/material/dialog';
import { MensajePostuladoComponent } from 'src/app/Compartido/mensaje-postulado/mensaje-postulado.component';
import { ConfirmarGuardarComponent } from '../../Compartido/confirmar-guardar/confirmar-guardar.component';
import { DialogFechasComponent } from '../../Compartido/dialog-fechas/dialog-fechas.component';
import { InformeUsuariosService } from './informe-usuarios.service';

/* (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs; */

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})
export class AdministrarUsuariosComponent implements OnInit {

  cantidadTotalRegistros:number=0;
  cantidadRegistrosAMostrar:number=10;
  PaginaActual:number =1;
  listaUsuarios!:any;
  datosReporte:any =[];
  fecha:any
  constructor(
    private administradorService:AdministradorService,
    private location:Location,
    private activatedRouter:ActivatedRoute,
    public dialog : MatDialog,
    public informeUsuariosService:InformeUsuariosService

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

  columnas = ['No','Id','Email','Rol','Opciones']

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
  openDialog(rol:string):void{
    this.dialog.open(MensajePostuladoComponent,{
      width:'350px',
      data:'Este usuario '+rol+' no tiene su perfil registrado, por lo cual no se puede generara un reporte sobre el mismo'
    });
  }

  openDialogDarBaja(id:string){
    const dialogRef = this.dialog.open(ConfirmarGuardarComponent,{
      width:'350px',
      data:'¿Está seguro que desea dar de baja a este usuario?'
    });
    dialogRef.afterClosed()
    .subscribe( response =>{
      if(response){
        this.darDeBaja(id);
      }
    })
  }

  darDeBaja(id:string){
    this.administradorService.DarDeBajaUsuario(id)
    .subscribe( () =>{
      console.log("usuario suspendido");
      window.location.reload();
    })
  }

  openDialogForm(id:any,rol:any){
    const dialogRef= this.dialog.open(DialogFechasComponent,{
      width:'350px',
      data:'Por favor introduzca el rango de fechas para generar el informe'
    });
    dialogRef.afterClosed()
    .subscribe(response=>{
      if(response){
        let fecha_inicio = response.fecha_inicio
        let fecha_fin = response.fecha_fin
         this.generarInforme(id,rol,fecha_inicio,fecha_fin); 
      }
    })
  }

  generarInforme(id:string, rol:string,fecha_inicio:Date,fecha_fin:Date){
    this.administradorService.obtenerReporteUsuaios(id,rol,fecha_inicio,fecha_fin)
    .subscribe(reporte =>{
      if(reporte == null){
        this.openDialog(rol);
      }
      this.datosReporte =reporte ;
      if(rol=='empresa'){
           
        const pdfDefinition = this.informeUsuariosService.generarInformeEmpresa(this.datosReporte);  
        const pdf = pdfMake.createPdf(pdfDefinition);
        pdf.open();
      }
      if(rol == 'postulante'){
        const pdfDefinition = this.informeUsuariosService.generarInformePostulante(this.datosReporte);  
        const pdf = pdfMake.createPdf(pdfDefinition);
        pdf.open();
      }
        

    })
  }
}
