import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CompartidosService } from 'src/app/Compartido/servicios/compartidos.service';
import { SeguridadService } from 'src/app/seguridad/servicios/seguridad.service';
import { EmpresasService } from '../servicios/empresas.service';
import { publicar_empleo_creacionDTO, publicar_empleoDTO } from '../interfaces/empresas.interfaces';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-editar-publicacion',
  templateUrl: './editar-publicacion.component.html',
  styleUrls: ['./editar-publicacion.component.css']
})
export class EditarPublicacionComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private empresasService:EmpresasService,
    private compartidosService:CompartidosService,
    private seguridadService:SeguridadService,
    private recaptchaV3Service:ReCaptchaV3Service,
    ) { }


    form!:FormGroup
    modelo!:publicar_empleoDTO;
    empresaId!:number
    categorias:any[]=[];
    empleoId!:number
  ngOnInit(): void {

    this.empresaId=Number(localStorage.getItem('perfilID'))
    this.activatedRoute.params
    .subscribe((params:Params)=>{
      this.empleoId = params['id'];
      this.empresasService.obtnerEmpleoId(params['id'])
      .subscribe((value)=>{
        this.modelo=value
        this.form.patchValue(this.modelo)
        
      })
    })

    this.compartidosService.Obtener_categorias()
    .subscribe((categorias)=>{
      this.categorias = categorias;
    });
    

    this.form = this.formBuilder.group({
      puesto_empleo :['',{
        validators:[Validators.required]
      }],
      descripcion:['',{
        validators:[Validators.required]
      }],
      requisitos:['',{
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
  editarEmpleo(id:number,value:publicar_empleo_creacionDTO){
    this.recaptchaV3Service.execute('EDITAR')
    .subscribe(token =>{
      this.seguridadService.verificarReCaptcha(token)
      .subscribe(response =>{
        if(response.success === true){

          this.empresasService.editarEmpleo(id, value)
            .subscribe(() => {
              console.log('empleo editado')
              this.router.navigate(['/detalle-empleo', this.empleoId])
            })

        }else{
          this.mensajeRobot = 'Usted es un robot'
        }
      })
    })



    
  }

  /* editarEmpleo(id:number,value:publicar_empleo_creacionDTO){
    
    this.empresasService.editarEmpleo(id,value)
    .subscribe(()=>{
      console.log('empleo editado')
      this.router.navigate(['/detalle-empleo',this.empleoId])
    })
  } */

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
