import { Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula, MustMatch, ValidadorContraseña } from '../../../utilidades/Utilidades';

@Component({
  selector: 'app-registro-postulantes',
  templateUrl: './registro-postulantes.component.html',
  styleUrls: ['./registro-postulantes.component.css']
})
export class RegistroPostulantesComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  form!: FormGroup;


  ngOnInit(): void {
    this.form = this.formBuilder.group({
        nombre:['',{
          validators:[Validators.required]
        }],
        correo:['',{
          validators:[Validators.required, Validators.email]
        }],
        contraseña:['',{
          validators:[Validators.required, ValidadorContraseña()]
        }],
        confirmar_contraseña:['',{
          validators:[Validators.required]
        }]
    },{validators: MustMatch('contraseña','confirmar_contraseña')})
  }

  guardarCambios(){
    
  }

  obtenerError(){
    var nombre = this.form.get('nombre');
    
    if(nombre?.hasError('required') ){
      return 'El campo es requerido';
    }    
    else{
      return '';
    }
  }

  obtenerErrorCorreo(){
    var correo = this.form.get('correo');
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
    var contraseña = this.form.get('contraseña');
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
    var contraseña = this.form.get('confirmar_contraseña');
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
