import { Component, OnInit } from '@angular/core';
import { perfil_empresaDTO } from '../interfaces/empresas.interfaces';
import { EmpresasService } from '../servicios/empresas.service';
import { Router } from '@angular/router';
import { parsearErroresAPI, toBase64 } from '../../utilidades/Utilidades';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      celular:['',{
        validators:[Validators.required]
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

  errores:any=[];
  guardarCambios(perfil_empresa : perfil_empresaDTO){
    this.empresasService.CrearEmpresa(perfil_empresa)
    .subscribe(()=>{
      this.router.navigate(['']);
    },errores => this.errores = parsearErroresAPI(errores))
  }
}
