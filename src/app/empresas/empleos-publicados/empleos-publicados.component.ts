import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../servicios/empresas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleos-publicados',
  templateUrl: './empleos-publicados.component.html',
  styleUrls: ['./empleos-publicados.component.css']
})
export class EmpleosPublicadosComponent implements OnInit {

  constructor( private empresasService:EmpresasService,
    private router:Router) { }
  publicaciones!:any[] 
  publicaciones_vencidas:any[] = [1,2,3];
  id_empresa = Number(localStorage.getItem('perfilID')) 

  ngOnInit(): void {

    this.empresasService.obtenerEmpleosEmpresa(this.id_empresa)
    .subscribe( valor => {
      this.publicaciones = valor;
      console.log(this.publicaciones)
    })
  }


}
