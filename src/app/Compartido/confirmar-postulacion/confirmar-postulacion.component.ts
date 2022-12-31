import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-postulacion',
  templateUrl: './confirmar-postulacion.component.html',
  styleUrls: ['./confirmar-postulacion.component.css']
})
export class ConfirmarPostulacionComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<ConfirmarPostulacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje:string ) { }

    ngOnInit(): void {

    }

    onCancelar():void{
    this.dialogRef.close();
    }

}
