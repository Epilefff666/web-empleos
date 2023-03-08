import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-fechas',
  templateUrl: './dialog-fechas.component.html',
  styleUrls: ['./dialog-fechas.component.css']
})
export class DialogFechasComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    public dialogRef:MatDialogRef<DialogFechasComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje:string
  ) { }

  form!: FormGroup;  
  form_value:any  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fecha_inicio:['',{
        validators:[Validators.required]
      }],
      fecha_fin:['',{
        validators:[Validators.required]
      }],
    })
  }

  registrar(form:any){
    return form
  }


  onCancelar():void{
    this.dialogRef.close();
    }

    obtenerError(){
      var fecha_inicio = this.form.get('fecha_inicio');
      var fecha_fin = this.form.get('fecha_fin');
    if(fecha_inicio!.hasError('required') || fecha_fin!.hasError('required')  ){
      return 'El campo es requerido'
    }
    else{
      return '';
    }
    }
}
