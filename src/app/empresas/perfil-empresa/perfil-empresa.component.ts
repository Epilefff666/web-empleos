import { Component, OnInit } from '@angular/core';
import { perfil_empresa_creacionDTO } from '../interfaces/empresas.interfaces';
import { EmpresasService } from '../servicios/empresas.service';
import { Router, Params } from '@angular/router';
import { parsearErroresAPI, toBase64 } from '../../utilidades/Utilidades';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { SeguridadService } from '../../seguridad/servicios/seguridad.service';


@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.css']
})
export class PerfilEmpresaComponent implements OnInit {

  constructor(private empresasService:EmpresasService,
    private router:Router,
    private formBuilder:FormBuilder,
    private seguridadService:SeguridadService) { }

  imagenBase64!:string;
  form!:FormGroup; 
/*   prueba:any = 'Epistore'  */

  modelo:any;
  foto:any;
  email!:string;
  id!:number;

  ngOnInit(): void {
    
    this.email = this.seguridadService.obtenerCampoJWT('email')
    this.form = this.formBuilder.group({
      nombre_empresa:['',{
        validators:[Validators.required]
      }],
      direccion:['',{
        validators:[Validators.required]
      }],
      celular:['',{
        validators:[Validators.required,]
      }],
      correo:['',{
        validators:[Validators.required, Validators.email]
      }],
      telefono:[''],
      sector:['',{
        validators:[Validators.required]
      }],
      beneficios:['',{
        validators:[Validators.required]
      }],
      descripcion_empresa:['',{
        validators:[Validators.required]
      }],
      foto_perfil:[''],
      facebook:[''],
      instagram:[''],
      linkedin:[''],
      tiktok:[''],
      userId:[this.email]
    });

    this.empresasService.obtenerEmpresaEmail(this.email)
    .subscribe((modelo)=>{
      this.modelo= modelo
      if(this.modelo !== null){
         this.form.patchValue(this.modelo);
         this.foto = modelo.foto_perfil;
         
      }
    })
    
  }


  change(event:any){
    if(event.target.files.length > 0 ){
      const file:File = event.target.files[0];
      toBase64(file).then( (value:any) => this.imagenBase64 = value)
      .catch(error => console.log(error));
      this.setFile(file)
    }
  }

  setFile(file:File){
    this.form.get('foto_perfil')?.setValue(file);
  }


  errores:any=[];
  registrarPerfil(perfil_empresa : perfil_empresa_creacionDTO){
    this.empresasService.CrearEmpresa(perfil_empresa).subscribe( () => {
      console.log("se regsitro con exito")
      window.location.reload()
    },errores => this.errores = parsearErroresAPI(errores))
  }

  guardarCambios(perfil_empresa : perfil_empresa_creacionDTO){
    this.empresasService.actualizarEmpresaId(this.modelo.id,perfil_empresa)
    .subscribe(()=>{
      console.log("perfil actualizado")
      window.location.reload()
    })
  }

        /* errores */

  obtenerError(){
    const nombre = this.form.get('nombre_empresa');
    const descripcion = this.form.get('descripcion_empresa');
    const sector = this.form.get('sector');
    const direccion = this.form.get('direccion');
    const beneficios = this.form.get('beneficios');
    
    if(nombre?.hasError('required') || descripcion?.hasError('required') || sector?.hasError('required') || direccion?.hasError('required') || beneficios?.hasError('required')){
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
