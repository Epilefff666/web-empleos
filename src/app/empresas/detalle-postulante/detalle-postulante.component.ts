import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../servicios/empresas.service';
import { ActivatedRoute } from '@angular/router';
import { DetallePostulanteDTO } from '../interfaces/empresas.interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarPostulacionComponent } from 'src/app/Compartido/confirmar-postulacion/confirmar-postulacion.component';

@Component({
  selector: 'app-detalle-postulante',
  templateUrl: './detalle-postulante.component.html',
  styleUrls: ['./detalle-postulante.component.css']
})
export class DetallePostulanteComponent implements OnInit {

  detallePostulante!:DetallePostulanteDTO;
  form!:FormGroup

  constructor(
    private empresasService:EmpresasService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    public dialog : MatDialog
  ) { }



  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe( params => {
      this.cargarDetallePostulante( Number(params['postulanteId']) , Number(params['publicacionId']))
    })

    this.form = this.formBuilder.group({
      descripcion:[''],
      link:[''],
      fecha:[''],
      hora:['']
    })
  }

  cargarDetallePostulante(postulanteId:number,publicaiconId:number){
    this.empresasService.obtenerDetallePostulante(postulanteId,publicaiconId)
    .subscribe( detallePostulante =>{
      this.detallePostulante = detallePostulante;
      /* console.log(detallePostulante) */
    })
  }
  verPDF(cv:string){
    window.open(cv)
  }
  volver(){
    window.history.back();
  }

  aceptarEnviarInvitacion(value:any){
    console.log(value)
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
    /* console.log(postulanteId,publicacionId) */
    this.empresasService.rechazarPostulante(postulanteId,publicacionId,5)
    .subscribe(() =>{
        console.log('Postulante rechazado');
        window.history.back();
    })
  }

}
