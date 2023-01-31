import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { credencialesUsuario } from 'src/app/Compartido/interfaces/compartido.interfaces';
import { SeguridadService } from 'src/app/seguridad/servicios/seguridad.service';
import { MustMatch, parsearErroresAPI, ValidadorContraseña } from 'src/app/utilidades/Utilidades';

@Component({
  selector: 'app-registro-administrador',
  templateUrl: './registro-administrador.component.html',
  styleUrls: ['./registro-administrador.component.css']
})
export class RegistroAdministradorComponent implements OnInit {

  constructor( private formBuilder:FormBuilder,
    private seguridadService:SeguridadService,
    private router:Router) { }

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
     role:['administrador']

   },{validators: MustMatch('password','passwordConfirm')})
   

 }

 errores:string[]=[];
 registrar(credenciales:credencialesUsuario){
   console.log(credenciales)
   this.seguridadService.registrar(credenciales)
   .subscribe( respuesta =>{
     /* console.log(respuesta); */
     /* this.seguridadService.guardarToken(respuesta); */
     /* this.router.navigate(['administrar-usuarios']); */
     window.history.back()
     /* console.log(respuesta); */
   },errores => this.errores = parsearErroresAPI(errores));
 }


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
