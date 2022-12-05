import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MustMatch, ValidadorContraseña } from 'src/app/utilidades/primeraLetraMayuscula';
import { credencialesUsuario } from '../../interfaces/compartido.interfaces';

@Component({
  selector: 'app-registro-empresas',
  templateUrl: './registro-empresas.component.html',
  styleUrls: ['./registro-empresas.component.css']
})
export class RegistroEmpresasComponent implements OnInit {

  constructor( private formBuilder:FormBuilder) { }

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
        validators:[Validators.required,ValidadorContraseña() ]
      }],
      confirmar_contraseña:['',{ 
        validators:[Validators.required ]
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
