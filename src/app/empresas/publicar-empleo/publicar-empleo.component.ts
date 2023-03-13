import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpresasService } from '../servicios/empresas.service';
import { CompartidosService } from '../../Compartido/servicios/compartidos.service';
import { SeguridadService } from '../../seguridad/servicios/seguridad.service';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-publicar-empleo',
  templateUrl: './publicar-empleo.component.html',
  styleUrls: ['./publicar-empleo.component.css']
})
export class PublicarEmpleoComponent implements OnInit {

  constructor( private formBuilder:FormBuilder,
    private router:Router,
    private empresasService:EmpresasService,
    private compartidosService:CompartidosService,
    private seguridadService:SeguridadService,
    private recaptchaV3Service:ReCaptchaV3Service,
    ) { }

    form!:FormGroup
    empresaId!:number;
    categorias:any[]=[];


  ngOnInit(): void {
    this.empresaId =Number(localStorage.getItem('perfilID')) 

    this.compartidosService.Obtener_categorias()
    .subscribe((categorias)=>{
      this.categorias = categorias;
    });

    this.form = this.formBuilder.group({
      puesto_empleo :['',{
        validators:[Validators.required]
      }],
      descripcion_general :['',{
        validators:[Validators.required]
      }],
      funciones:['' ,{
        validators:[Validators.required]
      }],
      mision_cargo:['' ,{
        validators:[Validators.required]
      }],
      tipo_contrato:['' ,{
        validators:[Validators.required]
      }],
      jornada_laboral:['' ,{
        validators:[Validators.required]
      }],
      estudios:[ '' ,{
        validators:[Validators.required]
      }],
      anhos_experiencia:[ '' ,{
        validators:[Validators.required]
      }],
      conocimientos_idiomas:[ '' ,{
        validators:[Validators.required]
      }],
      competencias_laborales:['',{
        validators:[Validators.required]
      }],
      categoriasId:['',{
        validators:[Validators.required]
      }],
      fecha_publicacion:[new Date()],
      fecha_vencimiento:['',{
        validators:[Validators.required]
      }],
      perfil_empresaId:[this.empresaId],
      estadosId:[1]
    });
    

  }

  mensajeRobot!:string;
  publicarEmpleo(value:any){
    this.recaptchaV3Service.execute('PUBLICAR')
    .subscribe(token=>{
      this.seguridadService.verificarReCaptcha(token)
      .subscribe( response =>{
        if( response.success === true){
          this.empresasService.publicarEmpleo(value)
            .subscribe(() => {
              console.log("empleo publicado")
              this.router.navigate(['empresas/empleos-publicados']);
              /* window.location.reload(); */
            })
            
        }else{
          this.mensajeRobot = 'Usted es un robot'
        }
      })
    })
  }


  obtenerError(){
    const puesto_empleo = this.form.get('puesto_empleo')
    const descripcion = this.form.get('descripcion')
    const requisitos = this.form.get('requisitos')
    const categoriasId = this.form.get('categoriasId')
    if(puesto_empleo?.hasError('required') || descripcion?.hasError('required')|| requisitos?.hasError('required')||categoriasId?.hasError('required')){
      return "El campo es requerido"
    }else{
      return '';
    }
  }


}
