import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { parsearErroresAPI, toBase64 } from 'src/app/utilidades/Utilidades';
import { SeguridadService } from '../../seguridad/servicios/seguridad.service';
import { PostulantesService } from '../servicios/postulantes.service';
import { perfil_postulante_creacionDTO } from '../interfaces/postulantes.interfaces';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-perfil-postulante',
  templateUrl: './perfil-postulante.component.html',
  styleUrls: ['./perfil-postulante.component.css']
})
export class PerfilPostulanteComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private seguridadService:SeguridadService,
    private postulantesService:PostulantesService,
    private recaptchaV3Service:ReCaptchaV3Service,
    ) { }
  
  pdf:any
  imagenBase64!:string;  
  cv!:string;  
  form!:FormGroup;
  email!:string
  errores:any=[];
  modelo:any; 
  foto:any;
  sexo:string[]=['Masculino','Femenino','Otro']  
  
  ngOnInit(): void {
    this.email = this.seguridadService.obtenerCampoJWT('email');

    this.form = this.formBuilder.group({

      nombres:['',{
        validators:[Validators.required]
      }],
      apellidos:['',{
        validators:[Validators.required]
      }],
      fecha_nacimiento:['',{
        validators:[Validators.required]
      }],
      numero_documento:['',{
        validators:[Validators.required]
      }],
      sexo:['',{
        validators:[Validators.required]
      }],
      profesion_ocupacion:['',{
        validators:[Validators.required]
      }],
      celular:['',{
        validators:[Validators.required]
      }],
      descripcion_postulante:['',{
        validators:[Validators.required]
      }],
      cv:[''],
      habilidad_blanda1:['',{
        validators:[Validators.required]
      }],
      habilidad_blanda2:['',{
        validators:[Validators.required]
      }],
      habilidad_blanda3:['',{
        validators:[Validators.required]
      }],
      habilidad_blanda4:['',{
        validators:[Validators.required]
      }],
      habilidad_blanda5:['',{
        validators:[Validators.required]
      }],
      habilidad_tecnica1:['',{
        validators:[Validators.required]
      }],
      habilidad_tecnica2:['',{
        validators:[Validators.required]
      }],
      habilidad_tecnica3:['',{
        validators:[Validators.required]
      }],
      habilidad_tecnica4:['',{
        validators:[Validators.required]
      }],
      habilidad_tecnica5:['',{
        validators:[Validators.required]
      }],
      correo:['',{
        validators:[Validators.required, Validators.email]
      }],
      foto_perfil:[''],
      facebook:[''],
      instagram:[''],
      linkedin:[''],
      tiktok:[''],
      userId:[this.email]
    });

    this.postulantesService.obtenerPerfilEmail(this.email)
    .subscribe((modelo)=>{
      /* console.log(modelo) */
      this.modelo = modelo;
      if(this.modelo !== null){
        this.form.patchValue(this.modelo)
        this.foto = modelo.foto_perfil;
        /* console.log(this.modelo) */
      }
    })

    
  }

  changeFoto(event:any){
    if(event.target.files.length > 0 ){
      let file:File = event.target.files[0];
      toBase64(file).then( (value:any) => this.imagenBase64 = value)
      .catch(error => console.log(error));
      this.form.get('foto_perfil')?.setValue(file);
    }
  }
  changeCv(event:any){
    if(event.target.files.length > 0 ){
      let file:File = event.target.files[0];
      toBase64(file).then( (value:any) => this.cv = value )
      .catch(error => console.log(error));
      this.form.get('cv')?.setValue(file)
    } 
  }

  abrirPdf(cv:any){
    window.open(cv);
  }
 
 
  
  registrarPerfil(perfil_postulante:perfil_postulante_creacionDTO){
    /* console.log(perfil_postulante) */
    this.postulantesService.crearPostulante(perfil_postulante)
    .subscribe(()=>{
      console.log('postulante registrado');
      window.location.reload()
    },errores => this.errores = parsearErroresAPI(errores))
  }

  mensajeRobot!:string
  guardarCambios(perfil:perfil_postulante_creacionDTO){
    
    this.recaptchaV3Service.execute('ACTUALIZAR')
    .subscribe(token => {
      this.seguridadService.verificarReCaptcha(token)
      .subscribe(response =>{
        if(response.success === true){

          this.postulantesService.EditarPostulante(this.modelo.id, perfil)
            .subscribe(() => {
              console.log('postulante actualizado')
              window.location.reload()
            }, errores => this.errores = parsearErroresAPI(errores))

        }else{
          this.mensajeRobot = 'Usted es un robot'
        }
        

      })
    })

    
  }


  /* obtenerError(){
    const nombres  = this.form.get('nombres')
    const apellidos  = this.form.get('apellidos')
    const fecha_nacimiento = this.form.get('fecha_nacimiento')
    const numero_documento = this.form.get('numero_documento')
    const sexo = this.form.get('sexo')
    const profesion_ocupacion = this.form.get('profesion_ocupacion')
    const celular = this.form.get('celular')
    const descripcion_postulante = this.form.get('descripcion_postulante')
    const cv = this.form.get('cv')
    const habilidad_blanda1 = this.form.get('habilidad_blanda1')
    const habilidad_blanda2 = this.form.get('habilidad_blanda2')
    const habilidad_blanda3 = this.form.get('habilidad_blanda3')
    const habilidad_blanda4 = this.form.get('habilidad_blanda4')
    const habilidad_blanda5 = this.form.get('habilidad_blanda5')
    const habilidad_tecnica1 = this.form.get('habilidad_tecnica1')
    const habilidad_tecnica2 = this.form.get('habilidad_tecnica2')
    const habilidad_tecnica3 = this.form.get('habilidad_tecnica3')
    const habilidad_tecnica4 = this.form.get('habilidad_tecnica4')
    const habilidad_tecnica5 = this.form.get('habilidad_tecnica5')
    
    let array = [nombres,apellidos,fecha_nacimiento,numero_documento,sexo,profesion_ocupacion,celular,
                descripcion_postulante,cv,habilidad_blanda1,habilidad_blanda2,habilidad_blanda3,habilidad_blanda4,
                habilidad_blanda5,habilidad_tecnica1,habilidad_tecnica2,habilidad_tecnica3,habilidad_tecnica4,
                habilidad_tecnica5]
    for(let i=0; i < array.length;i++){
      if(array[i]?.hasError('required')){
        return 'El campo es requerdio';
      }
      else{
        return '';
      }
    }
  } */
 /*  obtenerErrorCorreo(){
    const correo = this.form.get('correo')
    if(correo?.hasError('required')){
      return 'El campo es requerido';
    }
    if(correo?.hasError('email')){
      return 'El campo esta mal escrito';
    }
  } */

  habilidades_blandas:any[]=[
    'comunicacion y escucha activa',
    'liderazgo',
    'planificacion y gestion del tiempo',
    'trabajo en equipo',
    'flexibilidad',
    'toma de decisiones',
    'orientacion a resultados',
    'negociacion',
  ]

  habilidades_tecnicas:any[]=[
    'transcripción y taquigrafia',
    'redacción persuasiva',
    'dominio de idiomas',
    'diseño gráfico',
    'manejo de herramientas contabilidad',
    'conocimineto de gestores de contenido (wordpewss)',
    'conocimiento informatico básico (Microsoft Office)',
    'manejo de hojas de cálculo (Microsoft Excel)',
    'uso de programas para hacer presentaciones (Microsoft PowerPoint)',
    'manejo de software de bases de datos (Microsoft Access)',
    'uso de aplicaciones de métricas web (Google Analytics)',
    'técnicas básicas de retoque fotográfico (Adobe Photoshop)',
    'manejo de programas de diseño o ilustración (Adobe Illustrator)',
  ]
}
