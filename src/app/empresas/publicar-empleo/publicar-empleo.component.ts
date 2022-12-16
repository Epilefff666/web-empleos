import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-publicar-empleo',
  templateUrl: './publicar-empleo.component.html',
  styleUrls: ['./publicar-empleo.component.css']
})
export class PublicarEmpleoComponent implements OnInit {

  constructor( private formBuilder:FormBuilder) { }

    form!:FormGroup

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      puesto_empleo :['',{
        validators:[Validators.required]
      }],
      salario:[''],
      descripcion:['',{
        validators:[Validators.required]
      }],
      requisitos:['',{
        validtors:[Validators.required]
      }],
      fecha_vencimiento:['',{
        validators:[Validators.required]
      }],
    })
  }

  publicarEmpleo(value:any){
    console.log("form enviado")
    console.log(value);
  }

}
