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
  resultados= false;
  formularioOriginal = {
    categoria:'',
    palabraClave:'',
    nombre_empresa:'',
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
    
    this.leerValoresUrl();
   
    /* this.compartidosService.Obtener_ofertas()
    .subscribe( ofertas => {
      this.Ofertas = ofertas;
      this.OfertasOriginal = ofertas;
      this.leerValoresUrl();
      this.valorRecibido=this.form.value;
      this.buscarOfertas(this.valorRecibido);
    }, error => console.error(error)); */

    /* this.form.valueChanges
    .subscribe(valores =>{
      this.Ofertas = this.OfertasOriginal;
      this.resultados=true;
      this.buscarOfertas(valores);
      this.escribirParametrosBusquedaEnUrl();
    }) */

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
      if(params['nombre_empresa']){
        objeto.nombre_empresa = params['nombre_empresa'];
      }
      if(params['Pagina']){
        this.paginaActual =Number( params['Pagina'])
      }
      if(params['cant']){
        this.cantidadRegistrosAMostrar =Number( params['cant'])
      }
      
      this.form.patchValue(objeto);
      let formulario = this.form.value
      this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar,formulario.palabraClave,formulario.categoria,formulario.nombre_empresa);
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
    if(valoresFormulario.nombre_empresa){
      queryStrings.push(`nombre_empresa=${valoresFormulario.nombre_empresa}`);
    }
    if(this.paginaActual){
      queryStrings.push(`Pagina=${this.paginaActual}`)
    }
    if(this.cantidadRegistrosAMostrar){
      queryStrings.push(`cant=${this.cantidadRegistrosAMostrar}`)
    }
      
    this.location.replaceState('buscar-empleo',queryStrings.join('&'));
  }



  navegar(url:string){
    this.router.navigate([url]);
  }

  /* buscarOfertas(valores:any){
    if(valores.palabraClave ){

      this.Ofertas = this.Ofertas.filter( (x: { puesto_empleo : string | any[]; }) => x.puesto_empleo.indexOf(valores.palabraClave) !== -1)
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
    
  } */

  buscar(form:any){
    this.Ofertas = this.OfertasOriginal;
/*     this.buscarOfertas(form); */
    this.Ofertas = this.OfertasOriginal;
    this.escribirParametrosBusquedaEnUrl();
    let palabraClave = form.palabraClave
    let categoria = form.categoria
    let nombre_empresa = form.nombre_empresa
    this.cargarRegistros(1,4,palabraClave,categoria,nombre_empresa)
    
   }

  limpiar(){
    this.form.patchValue(this.formularioOriginal);
    this.cargarRegistros(1,4,'','','')
    /* this.resultados = true */
  }

  cargarRegistros(pagina:number, cantidadRegistrosAMostrar:number,palabraclave:string,categoria:string,empresa:string){
    this.compartidosService.Obtener_ofertas(pagina,cantidadRegistrosAMostrar,palabraclave,categoria,empresa)
    .subscribe( (respuesta:HttpResponse<ofertas_publicadasDTO[]>) => {
      this.Ofertas = respuesta.body;
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
      this.OfertasOriginal = this.Ofertas;
      this.valorRecibido=this.form.value;
      /* this.buscarOfertas(this.valorRecibido); */
      /* console.log(this.Ofertas) */
      if(respuesta.body?.length == 0 ){
        this.resultados = false
      }else{
        this.resultados = true
      }
    }, error => console.error(error));
  }

  actualizarPaginacion(datos: PageEvent){
    console.log(datos.length)
    this.paginaActual =  datos.pageIndex +1 ;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    let form = this.form.value
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar,form.palabraClave,form.categoria,form.nombre_empresa); 
    this.escribirParametrosBusquedaEnUrl();
  }

}
