import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmarPostulacionComponent } from '../confirmar-postulacion/confirmar-postulacion.component';

@Component({
  selector: 'app-confirmar-guardar',
  templateUrl: './confirmar-guardar.component.html',
  styleUrls: ['./confirmar-guardar.component.css']
})
export class ConfirmarGuardarComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<ConfirmarPostulacionComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public mensaje:string
  ) { }

  ngOnInit(): void {
  }

  onCancelar():void{
    this.dialogRef.close();
    }

}
