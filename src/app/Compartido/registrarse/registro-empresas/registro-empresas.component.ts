import { Component, OnInit,} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MustMatch, parsearErroresAPI, ValidadorContraseña } from 'src/app/utilidades/Utilidades';
import { credencialesUsuario } from '../../interfaces/compartido.interfaces';
import { SeguridadService } from '../../../seguridad/servicios/seguridad.service';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-registro-empresas',
  templateUrl: './registro-empresas.component.html',
  styleUrls: ['./registro-empresas.component.css']
})
export class RegistroEmpresasComponent implements OnInit {

  constructor( private formBuilder:FormBuilder,
     private seguridadService:SeguridadService,
     private router:Router,
     private recaptchaV3Service:ReCaptchaV3Service,
     ) { }

  form!: FormGroup;
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({

      /* userName:['',{ 
        validators:[Validators.required]
      }], */
      email:['',{ 
        validators:[Validators.required, Validators.email]
      }],
      password:['',{ 
        validators:[Validators.required,ValidadorContraseña() ]
      }],
      passwordConfirm:['',{ 
        validators:[Validators.required ]
      }],
      role:['empresa']

    },{validators: MustMatch('password','passwordConfirm')})
    

  }

  mensajeRobot!:string;
  errores:string[]=[];
  token!:string;
  registrar(credenciales:credencialesUsuario){
    this.recaptchaV3Service.execute('REGISTRAR')
    .subscribe( token =>{
      this.token = token
      this.seguridadService.verificarReCaptcha(this.token)
      .subscribe( response =>{
        console.log(response)
        if(response.success === true){
          
          this.seguridadService.registrar(credenciales)
            .subscribe(respuesta => {
              console.log(respuesta);
              this.seguridadService.guardarToken(respuesta);
              this.router.navigate(['/']);
              location.reload();
            }, errores => this.errores = parsearErroresAPI(errores));

        }
        else{
          this.mensajeRobot ='Usted es un robot';
        }

      })

    })
    
    
  }

  /* errores:string[]=[];
  registrar(credenciales:credencialesUsuario){
    console.log(credenciales)
    this.seguridadService.registrar(credenciales)
    .subscribe( respuesta =>{
      console.log(respuesta);
      this.seguridadService.guardarToken(respuesta);
      this.router.navigate(['/']);
      location.reload();
      console.log(respuesta);
    },errores => this.errores = parsearErroresAPI(errores));
  } */


  obtenerError(){
    var nombre = this.form.get('userName');
    
    if(nombre?.hasError('required') ){
      return 'El campo es requerido';
    }    
    else{
      return '';
    }
  }

  obtenerErrorCorreo(){
    var correo = this.form.get('email');
    if(correo!.hasError('required')){
      return 'El campo es requerido'
    }
    if(correo!.hasError('email')){
      return 'El campo Correo esta mal escrito';
    }else{
      return '';
    }
  }

  obtenerErrorContrasenia(){
    var contraseña = this.form.get('password');
    if(contraseña!.hasError('required')){
      return 'El campo es requerido'
    }
    if(contraseña!.hasError('ValidadorContraseña')){
      return contraseña?.getError('ValidadorContraseña').mensaje;
    }else{
      return '';
    }
  }
  
  obtenerErrorConfirmacionContrasenia(){
    var contraseña = this.form.get('passwordConfirm');
    if(contraseña!.hasError('required')){
      return 'El campo es requerido'
    }
    if(contraseña!.hasError('MustMatch')){
      return 'Las contraseñas deben er iguales';
    }else{
      return '';
    }
  }


}
