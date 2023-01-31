import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AdministradorService } from '../servicios/administrador.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private administradorService:AdministradorService,
    private activatedRoute:ActivatedRoute,
  ) { }

  form!: FormGroup;
  categoriaId:any;
  ngOnInit(): void {

    this.activatedRoute.params
    .subscribe((params:Params)=>{
      this.categoriaId = params['id'];
      this.administradorService.obtenerCategoriaId(this.categoriaId)
      .subscribe( valor =>{
        this.form.patchValue(valor)
      })
    })

    this.form = this.formBuilder.group({
      nombre:['',{
        validators:[Validators.required]
      }]
    })
  }

  errores:string[]=[];
  editar(id:number,form:any){
    this.administradorService.editarCategoria(id,form)
    .subscribe(()=>{
      console.log('Categoria editada')
      window.history.back();
    })
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
