import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompartidosService } from '../servicios/compartidos.service';
import { detalle_empleoDTO } from '../interfaces/compartido.interfaces';
import { EmpresasService } from '../../empresas/servicios/empresas.service';
import { publicar_empleoDTO, perfil_empresaDTO } from '../../empresas/interfaces/empresas.interfaces';
import { PostulantesService } from '../../postulantes/servicios/postulantes.service';
import { FormBuilder } from '@angular/forms';
import { parsearErroresAPI } from 'src/app/utilidades/Utilidades';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarPostulacionComponent } from '../confirmar-postulacion/confirmar-postulacion.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MensajePostuladoComponent } from '../mensaje-postulado/mensaje-postulado.component';

@Component({
  selector: 'app-detalle-empleo',
  templateUrl: './detalle-empleo.component.html',
  styleUrls: ['./detalle-empleo.component.css']
})
export class DetalleEmpleoComponent implements OnInit {

  detalle_empleo!:any;
  empresaId!:number
  empresa!:perfil_empresaDTO;
  form!:any;
  id:any;
  publicacionId!:number;
  postulado = false;
  

  constructor( private compartidosService: CompartidosService, 
    private activatedRoute:ActivatedRoute, 
    private empresasService:EmpresasService,
    private postulantesService:PostulantesService,
    private formBuilder:FormBuilder,
    public dialog : MatDialog) { }

  ngOnInit(): void {
    

    this.activatedRoute.params.subscribe((params:Params) =>{
      this.publicacionId =Number(params['id_empleo']); 
      this.empresasService.obtnerEmpleoId(params['id_empleo'])
      .subscribe( (valor)=>{
        this.detalle_empleo = valor;
        this.empresaId = valor.perfil_empresaId;
        this.empresasService.obtenerEmpresaId(this.empresaId)
        .subscribe( (valor)=>{

        this.empresa = valor
        });
      });
    });

    this.id =Number(localStorage.getItem('perfilID')); 
    this.form = this.formBuilder.group({
      perfil_postulanteId:[this.id],
      publicacionesId:[this.publicacionId],
      fecha_postulacion:[new Date()],
      estadosId:[3]

    });

    this.postulantesService.obtnerPostulacionId(this.publicacionId,this.id)
    .subscribe(response=>{
      if(response){
        this.postulado = true
      }
      
    })

  }


  errores:any[]=[];
  postular(){
    let valor = this.form.value;
    this.postulantesService.postularEmpleo(valor)
    .subscribe(()=>{
    console.log('postulacion realizada');
    this.openDialogPostulacionExitosa()
    
  },errores => this.errores = parsearErroresAPI(errores)
   
  )
  
}

  openDialog():void{
    const dialogRef = this.dialog.open(ConfirmarPostulacionComponent,{
      width:'350px',
      data:'¿Está seguro que desea postular a este empleo?'
    });
    dialogRef.afterClosed()
    .subscribe( response =>{
      if(response){
        this.postular();
      }
    })
  }

  openDialogPostulacionExitosa():void{
    this.dialog.open(MensajePostuladoComponent,{
      width:'350px',
      data:'Postulacion exitosa'
    });
  }
}
