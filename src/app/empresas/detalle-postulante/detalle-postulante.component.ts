import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../servicios/empresas.service';
import { ActivatedRoute } from '@angular/router';
import { DetallePostulanteDTO, perfil_empresaDTO } from '../interfaces/empresas.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarPostulacionComponent } from 'src/app/Compartido/confirmar-postulacion/confirmar-postulacion.component';

@Component({
  selector: 'app-detalle-postulante',
  templateUrl: './detalle-postulante.component.html',
  styleUrls: ['./detalle-postulante.component.css']
})
export class DetallePostulanteComponent implements OnInit {

  empresaId!:number;
  detallePostulante!:DetallePostulanteDTO;
  datosEmpresa!:perfil_empresaDTO;
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
      descripcion:['',{
        validators:[Validators.required]}],
      link:[''],
      fecha:['',{
        validators:[Validators.required]}],
      hora:['',{
        validators:[Validators.required]}]
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

  openDialogAceptar(postulanteId:number,publicacionId:number,value:any):void{
    const dialogRef = this.dialog.open(ConfirmarPostulacionComponent,{
      width:'350px',
      data:'¿Está seguro de enviar el formulario de invitacion a entrevista?'
    });
    dialogRef.afterClosed()
    .subscribe( response =>{
      if(response){
         this.aceptarPostulante(postulanteId,publicacionId) 
        this.EnviarInvitacion(value)
      }
    })
  }


  EnviarInvitacion(value:any){
    this.empresaId = Number(localStorage.getItem('perfilID'))
    this.empresasService.obtenerEmpresaId(this.empresaId)
    .subscribe( empresa =>{
      let celular = this.detallePostulante.celular;
      let descripcion = value.descripcion;
      let link = value.link;
      let Dia = new Date(value.fecha).getDate();
      let Mes = new Date(value.fecha).getMonth()+1;
      let Años = new Date(value.fecha).getFullYear();
      let Hora = value.hora;
      let nombre_empresa = empresa.nombre_empresa
      let nombre_postulante = this.detallePostulante.nombres+" "+this.detallePostulante.apellidos
      let puesto_empleo = this.detallePostulante.puesto_empleo

      //window.open("https://web.whatsapp.com/send?phone="+celular+"&text=%2AMensaje%20notificacion%20de%20empleo%2A%0A%2ADescripcion%3A%2A%20"+descripcion+"%0A%2ALink%20de%20la%20reunion%3A%2A%20"+link+"%0A%2AFecha%20y%20hora%20de%20la%20entrevista%3A%2A%20"+Dia+"%2F"+Mes+"%2F"+Años+"%20-"+Hora)
      window.open("https://web.whatsapp.com/send?phone="+celular+"&text=*%f0%9f%94%94Mensaje+de+notificacion+de+empleo%f0%9f%94%94*%0d%0a*De%3a*+"+nombre_empresa+"%0d%0a*Para%3a*+"+nombre_postulante+"%0d%0a*En+respuesta+a+la+postulacion+para+el+cargo+de%3a*+%22"+puesto_empleo+"%22%0d%0a*Descripcion%3a*+%22+"+descripcion+"+%22%0d%0a*Link+de+la+reunion%3a*+"+link+"+%0d%0a*Fecha+y+hora+de+la+entrevista%3a*+"+Dia+"%2f"+Mes+"%2f"+Años+"-"+Hora+"%0d%0a%0d%0a++++++++++++*Empleos+Chuquisaca%f0%9f%8f%99%ef%b8%8f*");
  
    })

  }

  aceptarPostulante(postulanteId:number,publicacionId:number){
    this.empresasService.aceptarPostulante(postulanteId,publicacionId,4)
    .subscribe(()=>{
      console.log("postulante aceptado");
      window.history.back();
    })
  }

  openDialogRechazar(postulanteId:number,publicacionId:number):void{
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
