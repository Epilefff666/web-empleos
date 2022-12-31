import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmarPostulacionComponent } from '../confirmar-postulacion/confirmar-postulacion.component';

@Component({
  selector: 'app-mensaje-postulado',
  templateUrl: './mensaje-postulado.component.html',
  styleUrls: ['./mensaje-postulado.component.css']
})
export class MensajePostuladoComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<ConfirmarPostulacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje:string
  ) { }

  ngOnInit(): void {
   
  }
  onAceptar():void{
    this.dialogRef.close();
    }

}
