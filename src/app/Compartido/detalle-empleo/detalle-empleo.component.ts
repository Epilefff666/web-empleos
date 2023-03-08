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
import { MensajePostuladoComponent } from '../mensaje-postulado/mensaje-postulado.component';
import { ConfirmarGuardarComponent } from '../confirmar-guardar/confirmar-guardar.component';
import { AdministradorService } from 'src/app/administrador/servicios/administrador.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { SeguridadService } from '../../seguridad/servicios/seguridad.service';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;



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
  postulado:boolean = false;
  guardado:boolean = false ; 
  data:any[]=[];
  ReportePublicacion:any =[]
  ReportePostulantes:any =[]
  fecha:any;
  tabla:any=[]
  fecha_vencimiento: string;
  fecha_publicacion: string;

  constructor( private compartidosService: CompartidosService, 
    private activatedRoute:ActivatedRoute, 
    private empresasService:EmpresasService,
    private postulantesService:PostulantesService,
    private administradorService:AdministradorService,
    private formBuilder:FormBuilder,
    public dialog : MatDialog,
    private recaptchaV3Service:ReCaptchaV3Service,
    private seguridadService:SeguridadService,
    ) { }

  ngOnInit(): void {
    

    this.activatedRoute.params.subscribe((params:Params) =>{
      this.publicacionId =Number(params['id_empleo']); 
      this.empresasService.obtnerEmpleoId(params['id_empleo'])
      .subscribe( (valor)=>{
        this.detalle_empleo = valor;
        /* console.log(this.detalle_empleo) */
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

    let empleosGuardados:any =  localStorage.getItem(this.id)
    let ObjetoGuardado = JSON.parse(empleosGuardados)
    if(ObjetoGuardado !== null ){
      for(let i=0 ; i < ObjetoGuardado.length; i++ ){
        
        if(ObjetoGuardado[i].id == this.publicacionId){
          this.guardado= true;
          /* console.log(ObjetoGuardado[i].id) */
        }
      }
    }
    
  }

  mensajeRobot!:string
  errores:any[]=[];
  postular(){
    this.recaptchaV3Service.execute('POSTULAR')
    .subscribe(token=>{
      this.seguridadService.verificarReCaptcha(token)
      .subscribe(response=>{
        if(response.success === true){

          let valor = this.form.value;
          this.postulantesService.postularEmpleo(valor)
            .subscribe(() => {
              console.log('postulacion realizada');
              this.openDialogPostulacionExitosa()
              this.postulado = true

            }, errores => this.errores = parsearErroresAPI(errores))

        }else{
          this.mensajeRobot = 'Usted es un robot'
        }
      })
    })

    
  
}

/*   errores:any[]=[];
  postular(){
    let valor = this.form.value;
    this.postulantesService.postularEmpleo(valor)
    .subscribe(()=>{
    console.log('postulacion realizada');
    this.openDialogPostulacionExitosa()
    this.postulado = true
    
  },errores => this.errores = parsearErroresAPI(errores))
  
} */

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
  

  openDialogGuardar(){
    const dialogRef = this.dialog.open(ConfirmarGuardarComponent,{
      width:'350px',
      data:'¿Está seguro que desea guardar este empleo?'
    });
    dialogRef.afterClosed()
    .subscribe( response =>{
      if(response){
        this.guardarlocalStorage();
      }
    })
  }



  guardarlocalStorage(){
    let valor1 = [this.detalle_empleo];
    let data = localStorage.getItem(this.id)
    if(data == null){
      localStorage.setItem(this.id,JSON.stringify(valor1))
      this.guardado = true
    }
    else
    {
      let datarecuperado = JSON.parse(data)
      datarecuperado.push(this.detalle_empleo)
      localStorage.setItem(this.id,JSON.stringify(datarecuperado))
      this.guardado = true
    }
    
  }

  generarReporte(idEmpleo:number){
    this.administradorService.obtenerReportePostulantes(idEmpleo)
      .subscribe(reportePostulantes =>{
        this.ReportePostulantes = reportePostulantes;
       /*  console.log(this.ReportePostulantes) */
        if(this.ReportePostulantes.length == 0){
          this.tabla =[[{text:'UserId',bold:true,alignment:'center',fillColor:'#142F3F',color:'white'},{text:'Nombre',bold:true,alignment:'center',fillColor:'#142F3F',color:'white'},{text:'Estado de postulación',bold:true,alignment:'center',fillColor:'#142F3F',color:'white'}],
          ['No hay registros','No hay registros','No hay registros']]
        }else{
          let a =[[{text:'UserId',bold:true,alignment:'center',fillColor:'#142F3F',color:'white'},{text:'Nombre',bold:true,alignment:'center',fillColor:'#142F3F',color:'white'},{text:'Estado de postulación',bold:true,alignment:'center',fillColor:'#142F3F',color:'white'}]]

        for(let i=0; i < this.ReportePostulantes.length ; i++ ){
          let registro = [this.ReportePostulantes[i].userId, this.ReportePostulantes[i].nombres+' '+this.ReportePostulantes[i].apellidos, this.ReportePostulantes[i].estado]  
          a.push(registro)
        }
        this.tabla = a
        /* console.log(this.tabla) */
        }
          
    });

    this.administradorService.obtenerReportePublicacion(idEmpleo)
    .subscribe( reporte => {
      this.ReportePublicacion = reporte;
      
      let dia= new Date(this.ReportePublicacion.fecha_reporte).getDate();
      let  mes= new Date(this.ReportePublicacion.fecha_reporte).getMonth()+1;
      let  anho= new Date(this.ReportePublicacion.fecha_reporte).getFullYear();
      this.fecha = dia+'/'+mes+'/'+anho;

      let dia1= new Date(this.ReportePublicacion.fecha_publicacion).getDate();
      let  mes1= new Date(this.ReportePublicacion.fecha_publicacion).getMonth()+1;
      let  anho1= new Date(this.ReportePublicacion.fecha_publicacion).getFullYear();
      this.fecha_publicacion = dia1+'/'+mes1+'/'+anho1;

      let dia2= new Date(this.ReportePublicacion.fecha_vencimiento).getDate();
      let  mes2= new Date(this.ReportePublicacion.fecha_vencimiento).getMonth()+1;
      let  anho2= new Date(this.ReportePublicacion.fecha_vencimiento).getFullYear();
      this.fecha_vencimiento = dia2+'/'+mes2+'/'+anho2;

      const pdfDefinition:any = {
        pageMargins: [ 40, 100, 40, 60 ],
        header: [ 
          {svg:`<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="28" width="128" height="65" fill="black"/>
          <path d="M19.2004 78.32C18.0637 78.2467 17.0554 77.8983 16.1754 77.275C15.3321 76.6517 14.4337 76.01 13.4804 75.35C12.8571 74.7267 12.3621 74.0667 11.9954 73.37C11.6287 72.6367 11.3354 71.6833 11.1154 70.51C10.9687 69.8133 10.9687 68.9333 11.1154 67.87C11.2621 66.8067 11.5004 65.7433 11.8304 64.68C12.1604 63.58 12.4721 62.7 12.7654 62.04C13.2054 61.0133 13.7554 59.9133 14.4154 58.74C15.1121 57.53 15.7904 56.3933 16.4504 55.33C17.1471 54.23 17.6971 53.35 18.1004 52.69C18.3571 52.4333 18.4671 52.305 18.4304 52.305C18.4304 52.2683 18.4304 52.25 18.4304 52.25C18.4304 52.0667 18.6137 51.6083 18.9804 50.875C19.3837 50.105 19.7321 49.4267 20.0254 48.84C20.5754 48.2533 20.8871 47.7767 20.9604 47.41C21.0337 47.0433 20.9787 46.75 20.7954 46.53C20.7221 46.3833 20.8504 46.1267 21.1804 45.76C21.5104 45.3933 22.0054 44.9717 22.6654 44.495C23.3254 44.0183 24.0771 43.5417 24.9204 43.065C25.8004 42.3683 26.6437 42.0017 27.4504 41.965C28.2937 41.8917 28.7887 42.0567 28.9354 42.46C28.9354 42.57 29.1371 42.6067 29.5404 42.57C29.9804 42.4967 30.4754 42.405 31.0254 42.295C31.6121 42.1483 32.1254 42.0383 32.5654 41.965C32.7487 41.745 33.1704 41.58 33.8304 41.47C34.5271 41.3233 35.3337 41.195 36.2504 41.085C36.7271 41.1217 37.1854 41.14 37.6254 41.14C38.1021 41.1033 38.4871 41.0667 38.7804 41.03C39.1104 40.9933 39.2754 40.975 39.2754 40.975C39.5321 40.9017 39.8254 40.9383 40.1554 41.085C40.5221 41.2317 40.8521 41.635 41.1454 42.295C41.4021 42.955 41.3104 43.45 40.8704 43.78C40.4671 44.11 39.5137 44.3667 38.0104 44.55C36.9104 44.6967 35.9571 44.825 35.1504 44.935C34.3437 45.0083 33.5004 45.1183 32.6204 45.265C31.7404 45.375 30.6587 45.5767 29.3754 45.87C28.4587 46.0533 27.7071 46.2733 27.1204 46.53C26.5337 46.75 26.0204 47.0983 25.5804 47.575C25.1404 48.015 24.6454 48.6567 24.0954 49.5C23.8387 49.6833 23.5087 50.16 23.1054 50.93C22.7021 51.7 22.2987 52.47 21.8954 53.24C20.8687 54.67 19.9704 55.9167 19.2004 56.98C18.4671 58.0067 18.1737 58.6117 18.3204 58.795C18.3204 58.795 18.5221 58.85 18.9254 58.96C19.3287 59.07 19.6037 59.125 19.7504 59.125C20.1171 58.9417 20.5571 58.8133 21.0704 58.74C21.6204 58.6667 22.0604 58.5933 22.3904 58.52C24.6637 57.9333 26.4421 57.475 27.7254 57.145C29.0454 56.815 30.0354 56.5767 30.6954 56.43C31.3921 56.2467 31.9237 56.1367 32.2904 56.1C32.8037 55.6967 33.2987 55.6233 33.7754 55.88C34.2887 56.1367 34.6921 56.54 34.9854 57.09C35.1687 57.4933 35.1687 57.8417 34.9854 58.135C34.8387 58.4283 34.3804 58.7217 33.6104 59.015C32.8771 59.3083 31.7771 59.6567 30.3104 60.06C28.8437 60.4633 26.9187 60.995 24.5354 61.655C22.5187 62.2417 20.7954 62.59 19.3654 62.7C17.9354 62.81 17.2571 62.4983 17.3304 61.765C17.0737 61.6183 16.7804 61.8017 16.4504 62.315C16.1571 62.7917 15.8637 63.4517 15.5704 64.295C15.2771 65.1383 15.0204 66.0367 14.8004 66.99C14.6171 67.9433 14.4887 68.8417 14.4154 69.685C14.3787 70.4917 14.4337 71.0967 14.5804 71.5C14.8737 72.3433 15.2587 73.0217 15.7354 73.535C16.2121 74.0117 17.0737 74.4333 18.3204 74.8C19.0537 74.8367 19.7687 74.8917 20.4654 74.965C21.1621 75.0383 21.9504 74.8917 22.8304 74.525C24.9937 74.1583 26.6987 73.7733 27.9454 73.37C29.1921 72.9667 29.9071 72.6917 30.0904 72.545C30.3837 72.3983 30.5671 72.325 30.6404 72.325C30.7504 72.2883 30.8971 72.27 31.0804 72.27C30.9704 72.4533 31.0071 72.4717 31.1904 72.325C31.4104 72.1417 31.7037 71.8667 32.0704 71.5C32.4737 71.1333 33.0054 70.785 33.6654 70.455C34.3254 70.125 34.9121 69.8683 35.4254 69.685C35.9754 69.5017 36.2687 69.5017 36.3054 69.685C36.5254 70.0517 36.4887 70.565 36.1954 71.225C35.9021 71.8483 35.3704 72.545 34.6004 73.315C33.8304 74.0483 32.8404 74.7633 31.6304 75.46C29.6871 76.4867 27.5787 77.2017 25.3054 77.605C23.0321 78.045 20.9971 78.2833 19.2004 78.32ZM47.0467 67.21C46.8267 67.21 46.5517 67.21 46.2217 67.21C45.8917 67.1733 45.5251 67.0817 45.1217 66.935C44.5717 66.935 44.2051 66.88 44.0217 66.77C43.8384 66.6233 43.6734 66.4217 43.5267 66.165C43.1234 65.615 43.0867 65.2483 43.4167 65.065C43.7467 64.845 44.5901 64.6617 45.9467 64.515C47.1934 64.2217 48.3484 64.02 49.4117 63.91C50.4751 63.8 51.7401 63.745 53.2067 63.745C54.1601 63.745 54.8017 63.7817 55.1317 63.855C55.4617 63.9283 55.8284 64.1667 56.2317 64.57C56.7817 65.12 56.9834 65.6517 56.8367 66.165C56.6901 66.6417 56.1951 66.8067 55.3517 66.66C55.0951 66.6967 54.6184 66.7333 53.9217 66.77C53.2251 66.8067 52.5467 66.8617 51.8867 66.935C51.4834 66.9717 50.8417 67.0267 49.9617 67.1C49.0817 67.1733 48.1101 67.21 47.0467 67.21ZM68.6162 80.08C68.0662 79.86 67.4979 79.6217 66.9112 79.365C66.3612 79.1083 65.8295 78.7233 65.3162 78.21C64.8395 77.7333 64.4179 77.055 64.0512 76.175C63.6845 75.1117 63.4279 74.0667 63.2812 73.04C63.1712 72.0133 63.1345 70.8217 63.1712 69.465C63.1712 67.5583 63.2995 65.9083 63.5562 64.515C63.8495 63.085 64.2895 61.6367 64.8762 60.17C64.9495 60.06 65.0779 59.7483 65.2612 59.235C65.4812 58.685 65.7195 58.0983 65.9762 57.475C66.2695 56.8517 66.4895 56.375 66.6362 56.045C66.9295 55.4217 67.3695 54.5967 67.9562 53.57C68.5795 52.5067 69.2395 51.48 69.9362 50.49C70.9995 48.9133 71.8795 47.6667 72.5762 46.75C73.2729 45.8333 73.9329 45.0633 74.5562 44.44C75.1795 43.8167 75.8762 43.23 76.6462 42.68C77.4529 42.0933 78.4795 41.3783 79.7262 40.535C80.5329 39.9483 81.4129 39.6367 82.3662 39.6C83.3562 39.5633 84.2729 39.7833 85.1162 40.26C85.9595 40.7 86.5829 41.36 86.9862 42.24C87.3895 43.01 87.5912 43.945 87.5912 45.045C87.5912 46.1083 87.4262 47.245 87.0962 48.455C86.7662 49.6283 86.3079 50.7467 85.7212 51.81C85.1345 52.8733 84.4562 53.7533 83.6862 54.45C83.2095 54.89 82.7695 55.055 82.3662 54.945C81.9995 54.835 81.5595 54.5417 81.0462 54.065C80.7162 53.4417 80.5329 53.075 80.4962 52.965C80.4962 52.855 80.5695 52.7817 80.7162 52.745C80.9362 52.4883 81.2295 52.0483 81.5962 51.425C81.9629 50.8017 82.3295 50.1417 82.6962 49.445C83.0629 48.7117 83.3195 48.125 83.4662 47.685C83.7595 46.145 83.9612 45.0633 84.0712 44.44C84.1812 43.78 84.0712 43.285 83.7412 42.955C83.5945 42.8083 83.3745 42.7533 83.0812 42.79C82.8245 42.8267 82.3845 43.01 81.7612 43.34C80.9179 43.7067 79.8179 44.5317 78.4612 45.815C77.1045 47.0617 75.8579 48.455 74.7212 49.995C73.2545 51.9383 72.0262 53.6617 71.0362 55.165C70.0462 56.6683 69.2945 58.2083 68.7812 59.785C68.7079 59.9317 68.5795 60.2067 68.3962 60.61C68.2495 61.0133 68.1762 61.215 68.1762 61.215C68.2129 61.3617 68.1579 61.7283 68.0112 62.315C67.8645 62.865 67.6995 63.3417 67.5162 63.745C67.1129 65.4317 66.8745 67.1917 66.8012 69.025C66.7279 70.8217 66.8195 72.4167 67.0762 73.81C67.3695 75.2033 67.7912 76.175 68.3412 76.725C68.8179 77.055 69.4595 77.165 70.2662 77.055C71.1095 76.945 72.0629 76.6883 73.1262 76.285C74.1895 75.8817 75.2712 75.4417 76.3712 74.965C77.2512 74.5983 78.0579 74.195 78.7912 73.755C79.5245 73.315 80.0745 72.93 80.4412 72.6C80.7345 72.38 81.1012 72.16 81.5412 71.94C82.0179 71.6833 82.4212 71.555 82.7512 71.555C83.2645 71.3717 83.5579 71.2983 83.6312 71.335C83.7045 71.3717 83.7412 71.5367 83.7412 71.83C83.7412 72.3433 83.4479 72.9117 82.8612 73.535C82.3112 74.1583 81.5962 74.7267 80.7162 75.24C80.4229 75.5333 80.0379 75.845 79.5612 76.175C79.0845 76.505 78.5895 76.7617 78.0762 76.945C77.3062 77.5317 76.3529 78.1 75.2162 78.65C74.0795 79.2 72.9245 79.6217 71.7512 79.915C70.6145 80.2083 69.5695 80.2633 68.6162 80.08ZM91.9186 74.03C91.6619 74.0667 91.3869 74.0667 91.0936 74.03C90.8369 73.9567 90.5802 73.8283 90.3236 73.645C90.0302 73.3517 89.8286 73.1317 89.7186 72.985C89.6086 72.8017 89.5719 72.5267 89.6086 72.16C89.6819 71.7933 89.8102 71.225 89.9936 70.455C90.1769 69.8683 90.3969 69.0617 90.6536 68.035C90.9102 66.9717 91.1852 65.9267 91.4786 64.9C91.5886 64.3133 91.7352 63.7083 91.9186 63.085C92.1386 62.4617 92.3586 61.8933 92.5786 61.38C92.7986 60.83 92.9636 60.4083 93.0736 60.115C93.3669 59.0883 93.6419 58.19 93.8986 57.42C94.1919 56.65 94.5402 55.77 94.9436 54.78C95.3469 53.7533 95.8419 52.3967 96.4286 50.71C97.2352 48.51 97.8402 46.8417 98.2436 45.705C98.6836 44.5317 98.9952 43.6883 99.1786 43.175C99.3986 42.625 99.5452 42.2033 99.6186 41.91C99.6186 41.6167 99.6919 41.3967 99.8386 41.25C100.022 41.1033 100.242 41.03 100.499 41.03C101.012 41.03 101.415 41.2867 101.709 41.8C102.039 42.2767 102.24 42.8633 102.314 43.56C102.387 44.22 102.277 44.8433 101.984 45.43C101.397 46.75 100.774 48.3267 100.114 50.16C99.4536 51.9567 98.8119 53.735 98.1886 55.495C97.5652 57.2183 96.9786 58.685 96.4286 59.895C96.4286 60.0417 96.3736 60.2983 96.2636 60.665C96.1536 61.0317 96.0252 61.3617 95.8786 61.655C95.7319 61.9483 95.5852 62.2233 95.4386 62.48C95.3286 62.7367 95.2736 62.865 95.2736 62.865C95.2736 63.0117 95.2186 63.2867 95.1086 63.69C94.9986 64.0933 94.8519 64.5883 94.6686 65.175C94.5219 65.615 94.3386 66.1833 94.1186 66.88C93.9352 67.5767 93.8069 68.1633 93.7336 68.64C93.9169 68.31 94.3019 67.815 94.8886 67.155C95.4752 66.495 96.0252 65.9267 96.5386 65.45C97.1252 64.9367 97.7852 64.3683 98.5186 63.745C99.2519 63.1217 99.8386 62.6633 100.279 62.37C100.719 62.0767 101.104 61.82 101.434 61.6C101.8 61.3433 101.984 61.215 101.984 61.215C101.984 61.0683 102.039 60.995 102.149 60.995C102.295 60.9583 102.442 60.94 102.589 60.94C102.735 60.94 102.809 60.9217 102.809 60.885C102.845 60.8483 102.864 60.7567 102.864 60.61C102.864 60.4267 103.065 60.2617 103.469 60.115C103.909 59.9683 104.404 59.8583 104.954 59.785C105.54 59.675 106.017 59.62 106.384 59.62C106.824 59.62 107.172 59.7117 107.429 59.895C107.685 60.0783 108.015 60.4817 108.419 61.105C108.859 61.6917 109.134 62.4067 109.244 63.25C109.39 64.0567 109.317 64.9 109.024 65.78C109.024 66.0733 108.969 66.495 108.859 67.045C108.785 67.5583 108.749 68.1083 108.749 68.695L108.419 70.455H109.299C109.592 70.455 109.867 70.51 110.124 70.62C110.38 70.6933 110.509 70.73 110.509 70.73C110.655 70.8767 110.802 71.0233 110.949 71.17C111.095 71.28 111.242 71.335 111.389 71.335C111.829 71.335 111.994 71.5183 111.884 71.885C111.774 72.215 111.499 72.5267 111.059 72.82C110.179 73.4067 109.372 73.7 108.639 73.7C107.942 73.7 107.3 73.4067 106.714 72.82C106.127 72.1967 105.76 71.5 105.614 70.73C105.467 69.96 105.54 68.9883 105.834 67.815C105.98 66.2017 106.054 65.0283 106.054 64.295C106.09 63.525 105.907 63.14 105.504 63.14C105.137 63.14 104.495 63.3967 103.579 63.91C102.662 64.3867 101.635 65.0467 100.499 65.89C99.3619 66.7333 98.2436 67.6683 97.1436 68.695C96.0436 69.7217 95.1269 70.785 94.3936 71.885C93.9536 72.435 93.5319 72.93 93.1286 73.37C92.7252 73.7733 92.3219 73.9933 91.9186 74.03ZM120.016 74.14C119.32 74.3967 118.733 74.525 118.256 74.525C117.816 74.4883 117.321 74.2683 116.771 73.865C116.075 73.205 115.836 72.545 116.056 71.885C116.313 71.1883 116.918 70.51 117.871 69.85C118.531 69.4467 119.008 69.2267 119.301 69.19C119.631 69.1533 120.126 69.2817 120.786 69.575C121.886 70.2717 122.363 71.0417 122.216 71.885C122.106 72.7283 121.373 73.48 120.016 74.14Z" fill="white"/>
          </svg>
          
          `,width:100,alignment:'left',margin:[40,10,0,10]},
        ],
        content:[
          {text:'Fecha reporte: '+this.fecha, margin:[0,20,0,20],alignment:'right' },
          {text:'Reporte de datos de Oferta de empleo', margin:[0,20,0,20],alignment:'center',decoration:'underline',bold:true},
          {text:' '},
          {text:' '},
          {text:'Fecha de publicacion: '+this.fecha_publicacion+'   Fecha de vencimiento: '+this.fecha_vencimiento, bold:true},
          {text:''},
          {text:'Nombre de la empresa: ',bold:true},
          {text:this.ReportePublicacion.empresa},
          {text:' '},
          {text:'Puesto empleo: ',bold:true},
          {text:this.ReportePublicacion.puesto_empleo},
          {text:' '},
          {text:'Descripcion del empleo: ',bold:true},
          {text:this.ReportePublicacion.descripcion},
          {text:' '},
          {text:'Categoria de empleo: ',bold:true},
          {text:this.ReportePublicacion.categoria},
          {text:' '},
          {text:'Cantidad de postulantes: '+this.ReportePublicacion.cantidad_postulantes,bold:true},
          {text:' '},
          {text:'Cantidad de postulantes aceptados: '+this.ReportePublicacion.cantidad_aceptados,bold:true},
          {text:' '},
          {text:'Cantidad de postulantes rechazados: '+this.ReportePublicacion.cantidad_rechazados,bold:true},
          {text:' '},
          {text:'Cantidad de postulantes en espera: '+this.ReportePublicacion.cantidad_esperando,bold:true},
          {text:' '},
          {text:' '},
          {
            layout: 'lightVerticalLines', // optional
            table: {
              alignment:'right',
              headerRows: 1,
              widths: [ '50%','30%', '20%' ],
              body:this.tabla
            }
          }




          
        ],
        
       }
        const pdf = pdfMake.createPdf(pdfDefinition);
        pdf.open();
    });
    
  }
}
