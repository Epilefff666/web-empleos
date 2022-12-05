import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CompartidosService } from '../servicios/compartidos.service';
import { detalle_empleoDTO } from '../interfaces/compartido.interfaces';

@Component({
  selector: 'app-detalle-empleo',
  templateUrl: './detalle-empleo.component.html',
  styleUrls: ['./detalle-empleo.component.css']
})
export class DetalleEmpleoComponent implements OnInit {

  detalle_empleo!: detalle_empleoDTO ;

  constructor( private compartidosService: CompartidosService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params:Params) =>{
      this.compartidosService.Obtener_detalle_empleo( params['id_empleo'] )
      .subscribe( response =>{
        this.detalle_empleo = response;
        console.log(response)
      });
    });
  }
}
