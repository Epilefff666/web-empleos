import { Component, OnInit, ViewEncapsulation,ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MensajePostuladoComponent } from 'src/app/Compartido/mensaje-postulado/mensaje-postulado.component';
import { AdministradorService } from '../servicios/administrador.service';
import html2canvas from 'html2canvas';
import { BaseChartComponent, ChartComponent } from '@swimlane/ngx-charts/public-api';
import { DatosInformeService } from './datos-informe.service';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-informe-de-datos',
  templateUrl: './informe-de-datos.component.html',
  styleUrls: ['./informe-de-datos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InformeDeDatosComponent implements OnInit {
  datosReporte!:any;
  pdfDefinition!:any;
  fecha:any;
  datos_sexo:any;
  datos_postulantes:any[];
  publicaciones_meses:any[];
  postulantes_meses:any[];
  //--------------------------graficas--torta estadistica
  view: [number,number] = [700, 200];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;

//--------------------------------fin de graficas torta estadistica
//----------------------graficas-barras
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Meses';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad publicaciones';
  yAxisLabel2 = 'Cantidad postulaciones';

//-------------------------fin grafica barras

  constructor(
    private administradorService:AdministradorService,
    public dialog : MatDialog,
    private datosIformeService:DatosInformeService
  ) { }

  ngOnInit(): void {
    this.administradorService.obtenerReporte()
    .subscribe(reporte =>{
          this.datosReporte =reporte ;   
          this.datos_sexo=this.datosIformeService.datosSexo(this.datosReporte);
          this.datos_postulantes=this.datosIformeService.datosPostulantes(this.datosReporte);
          this.publicaciones_meses=this.datosIformeService.publicacionesMeses(this.datosReporte);
          this.postulantes_meses=this.datosIformeService.postulantesMeses(this.datosReporte);
    });

  }

  GenerarBackup(){
    this.administradorService.obtenerBackup()
    .subscribe( ()=>{
        console.log('backup generado');
        this.openDialogbackup()
    })
  }

  openDialogbackup():void{
    this.dialog.open(MensajePostuladoComponent,{
      width:'350px',
      data:'Backup generado exitosamente ubicado en "C:/Users/Public/Downloads" de su explorador de archivos'
    });
  }


//--------------------------reporte pdf 
  columnas = ['No','Detalle','Cantidad'];
  createPDF(){
    const pdfDefinition:any = this.datosIformeService.pdfGeneral(this.datosReporte); 
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

}
