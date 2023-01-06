import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../servicios/empresas.service';
import { ActivatedRoute } from '@angular/router';
import { DetallePostulanteDTO } from '../interfaces/empresas.interfaces';

@Component({
  selector: 'app-detalle-postulante',
  templateUrl: './detalle-postulante.component.html',
  styleUrls: ['./detalle-postulante.component.css']
})
export class DetallePostulanteComponent implements OnInit {

  detallePostulante!:DetallePostulanteDTO;

  constructor(
    private empresasService:EmpresasService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe( params => {
      this.cargarDetallePostulante( Number(params['postulanteId']) , Number(params['publicacionId']))
    })
  }

  cargarDetallePostulante(postulanteId:number,publicaiconId:number){
    this.empresasService.obtenerDetallePostulante(postulanteId,publicaiconId)
    .subscribe( detallePostulante =>{
      this.detallePostulante = detallePostulante;
      console.log(detallePostulante)
    })
  }
  verPDF(cv:string){
    window.open(cv)
  }
  volver(){
    window.history.back();
  }

}
