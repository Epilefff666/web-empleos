import { Component, OnInit } from '@angular/core';
import { perfil_empresaDTO } from '../interfaces/empresas.interfaces';
import { EmpresasService } from '../servicios/empresas.service';
import { Router } from '@angular/router';
import { parsearErroresAPI, toBase64 } from '../../utilidades/Utilidades';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.css']
})
export class PerfilEmpresaComponent implements OnInit {

  constructor(private empresasService:EmpresasService,
    private router:Router,
    private formBuilder:FormBuilder) { }

  imagenBase64!:string;
  form!:FormGroup;  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre_empresa:['',{
        validators:[Validators.required]
      }],
      direccion:['',{
        validators:[Validators.required]
      }],
      correo:['',{
        validators:[Validators.required, Validators.email]
      }],
      celular:['',{
        validators:[Validators.required,]
      }],
      telefono:[''],
      sector:['',{
        validators:[Validators.required]
      }],
      beneficios:['',{
        validator:[Validators.required]
      }],
      descripcion:['',{
        validators:[Validators.required]
      }],
      foto_perfil:[''],

      banActivo:[''],

    }) 
  }


  change(event:any){
    if(event.target.files.length > 0 ){
      const file:File = event.target.files[0];
      toBase64(file).then( (value:any) => this.imagenBase64 = value)
      .catch(error => console.log(error));
      console.log(this.imagenBase64)
    }
  }

  guardarprueba(valor:any){
    console.log("formulario enviado")
    console.log(valor)
  }

  errores:any=[];
  guardarCambios(perfil_empresa : perfil_empresaDTO){
    this.empresasService.CrearEmpresa(perfil_empresa)
    .subscribe(()=>{
      this.router.navigate(['']);
    },errores => this.errores = parsearErroresAPI(errores))
  }

  obtenerError(){
    const nombre = this.form.get('nombre_empresa');
    const descripcion = this.form.get('descripcion');
    const sector = this.form.get('sector');
    const direccion = this.form.get('direccion');
    
    if(nombre?.hasError('required') || descripcion?.hasError('required') || sector?.hasError('required') || direccion?.hasError('required') ){
      return 'El campo es requerido';
    }    
    else{
      return '';
    }
  }

  obtenerErrorCelular(){
    const celular = this.form.get('celular');
    if(celular?.hasError('required')){
      return 'El campo es requerido';
    }
    if(celular?.hasError('minlength') ){
      return 'El campo esta mal escrito';
    } 
    else{
      return '';
    }
  }
  
  obtenerErrorCorreo(){
    const correo = this.form.get('correo');

    if(correo!.hasError('required')  ){
      return 'El campo es requerido';
    }
    if(correo!.hasError('email')){
      return 'El campo esta mal escrito';
    }    
    else{
      return '';
    }
  }






}
