import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministradorService } from '../servicios/administrador.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private administradorService:AdministradorService
  ) { }

  form!: FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre:['',{
        validators:[Validators.required]
      }]
    })
  }

  errores:string[]=[];
  registrar(form:any){
    this.administradorService.crearCategoria(form)
    .subscribe( () => {
      console.log('categoria registrada');
      window.history.back();
    });
  }
  volver(){
    window.history.back()
  }

  obtenerErrorNombre(){
    var nombre = this.form.get('nombre');
    if(nombre!.hasError('required')){
      return 'El campo es requerido'
    }
  }

}
