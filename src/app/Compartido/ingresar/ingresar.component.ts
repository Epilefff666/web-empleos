import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from '../../seguridad/servicios/seguridad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { credencialesUsuario } from '../interfaces/compartido.interfaces';
import { parsearErroresAPI } from '../../utilidades/Utilidades';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {

  constructor(private router:Router,
    private seguridadService:SeguridadService,
    private formBuilder:FormBuilder,
    private recaptchaV3Service:ReCaptchaV3Service,
    ) { }

    form!:FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      
      email:['',
      {
        validators:[Validators.required]
      }],
      password:['',
      {
        validators:[Validators.required]
      }]
    })
  }

  mensajeRobot!:string;
  token!:string
  robot:boolean=true
  errores:string[] =[];
  ingresar(credenciales:credencialesUsuario){

    this.recaptchaV3Service.execute('INGRESAR')
    .subscribe(token =>{
      /* console.log(token) */
      this.token = token
      this.seguridadService.verificarReCaptcha(this.token)
      .subscribe( response =>{
        /* console.log(response) */
        if(response.success === true){
          this.robot = false;
          if(this.robot === false){
            this.seguridadService.login(credenciales)
          .subscribe(respuesta => {
            /* console.log(respuesta) */
            this.seguridadService.guardarToken(respuesta);
            this.router.navigate(['inicio'])
            window.location.reload();
          }, errores => this.errores = parsearErroresAPI(errores));
          }
        }
        else{
          this.mensajeRobot = 'Usted es un robot';
        }
      })
    })

    
  }
/*   errores:string[] =[];
  ingresar(credenciales:credencialesUsuario){
    console.log(credenciales)
    this.seguridadService.login(credenciales)
    .subscribe(respuesta => {
      console.log(respuesta)
      this.seguridadService.guardarToken(respuesta);
      this.router.navigate(['/'])
      window.location.reload();
    }, errores => this.errores = parsearErroresAPI(errores));
  } */

  obtenerErrorCorreo(){
    var correo = this.form.get('email');
    if(correo!.hasError('required')){
      return 'El campo es requerido'
    }else{
      return '';
    }
  }

  obtenerErrorContrasenia(){
    var contraseña = this.form.get('password');
    if(contraseña!.hasError('required')){
      return 'El campo es requerido'
    }else{
      return '';
    }

  }

}


