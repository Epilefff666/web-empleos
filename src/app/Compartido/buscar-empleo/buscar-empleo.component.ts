import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CompartidosService } from '../servicios/compartidos.service';
import { categoriasDTO, ofertas_publicadasDTO } from '../interfaces/compartido.interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator'; 

@Component({
  selector: 'app-buscar-empleo',
  templateUrl: './buscar-empleo.component.html',
  styleUrls: ['./buscar-empleo.component.css']
})
export class BuscarEmpleoComponent implements OnInit {

  categorias:categoriasDTO[]=[];
  /* Ofertas!: ofertas_publicadasDTO[]; */
  Ofertas:any;
  OfertasOriginal: ofertas_publicadasDTO[] = [];
  resultados= true;
  formularioOriginal = {
    categoria:'',
    palabraClave:'',
  }
  form!:FormGroup;
  valorRecibido:any;
  cantidadTotalRegistros: any;
  cantidadRegistrosAMostrar = 4;
  paginaActual=1;

  constructor(
    private compartidosService:CompartidosService,
    private activatedRouter:ActivatedRoute,
    private router:Router,
    private formBuilder:FormBuilder,
    private location:Location,
    ) { }

  ngOnInit(): void {
    
    this.form = this.formBuilder.group(this.formularioOriginal);

    this.compartidosService.Obtener_categorias()
    .subscribe((categorias)=>{
      this.categorias=categorias;
    })

    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
    
    /* this.compartidosService.Obtener_ofertas()
    .subscribe( ofertas => {
      this.Ofertas = ofertas;
      this.OfertasOriginal = ofertas;
      this.leerValoresUrl();
      this.valorRecibido=this.form.value;
      this.buscarOfertas(this.valorRecibido);
    }, error => console.error(error)); */

    this.form.valueChanges
    .subscribe(valores =>{
      this.Ofertas = this.OfertasOriginal;
      this.resultados=true;
      this.buscarOfertas(valores);
      this.escribirParametrosBusquedaEnUrl();
    })
  }



  private leerValoresUrl(){
    this.activatedRouter.queryParams
    .subscribe((params:Params)=>{
      var objeto:any ={};
      if(params['palabraClave']){
        objeto.palabraClave = params['palabraClave'];
      }
      if(params['categoria']){
        objeto.categoria = params['categoria'];
      }
      this.form.patchValue(objeto);

    })
  }


  private escribirParametrosBusquedaEnUrl(){
    var queryStrings=[];
    var valoresFormulario = this.form.value;

    if(valoresFormulario.palabraClave){
      queryStrings.push(`palabraClave=${valoresFormulario.palabraClave}`);
    }
    if(valoresFormulario.categoria){
      queryStrings.push(`categoria=${valoresFormulario.categoria}`);
    }

    this.location.replaceState('buscar-empleo',queryStrings.join('&'));
  }



  navegar(url:string){
    this.router.navigate([url]);
  }

  buscarOfertas(valores:any){
    if(valores.palabraClave ){
      
      this.Ofertas = this.Ofertas.filter( (x: { puesto_empleo: string | any[]; }) => x.puesto_empleo.indexOf(valores.palabraClave) !== -1)
      if(this.Ofertas.length == 0){
        this.resultados = false;
      }
    }
    if(valores.categoria !== 0){
      this.Ofertas =  this.Ofertas.filter( (x: { categoria: string | any[]; }) => x.categoria.indexOf(valores.categoria) !== -1 )
      if(this.Ofertas.length == 0 ){
        this.resultados = false;
      }
    }
    
  }

  limpiar(){
    this.form.patchValue(this.formularioOriginal);
    this.resultados = true
  }

  cargarRegistros(pagina:number, cantidadRegistrosAMostrar:number){
    this.compartidosService.Obtener_ofertas(pagina,cantidadRegistrosAMostrar)
    .subscribe( (respuesta:HttpResponse<ofertas_publicadasDTO[]>) => {
      this.Ofertas = respuesta.body;
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
      this.OfertasOriginal = this.Ofertas;
      this.leerValoresUrl();
      this.valorRecibido=this.form.value;
      this.buscarOfertas(this.valorRecibido);
      console.log(this.Ofertas)
    }, error => console.error(error));
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex +1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar); 
  }

}
