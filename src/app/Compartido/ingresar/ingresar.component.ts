import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from '../../seguridad/servicios/seguridad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { credencialesUsuario } from '../interfaces/compartido.interfaces';
import { parsearErroresAPI } from '../../utilidades/Utilidades';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {

  constructor(private router:Router,
    private seguridadService:SeguridadService,
    private formBuilder:FormBuilder) { }

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

  errores:string[] =[];
  ingresar(credenciales:credencialesUsuario){
    /* console.log(credenciales) */
    this.seguridadService.login(credenciales)
    .subscribe(respuesta => {
      /* console.log(respuesta) */
      this.seguridadService.guardarToken(respuesta);
      this.router.navigate(['/'])
      window.location.reload();
    }, errores => this.errores = parsearErroresAPI(errores));
  }

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


