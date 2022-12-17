import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from '../../seguridad/servicios/seguridad.service';
import { EmpresasService } from '../../empresas/servicios/empresas.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router,
    private seguridadService:SeguridadService,
    private empresasService: EmpresasService  ) { }

  modelo:any;
  nombre:string = ''; 
  ngOnInit(): void {
   this.nombre= this.seguridadService.obtenerCampoJWT('email'); 
   this.empresasService.obtenerEmpresaId(this.nombre)
   .subscribe((modelo)=>{ 
    this.modelo=modelo  
    this.router.navigate(['inicio']);
  });
   console.log(this.modelo)
  }

  navegar(url:string){
    this.router.navigate([url]);
  }
  logOut(){
    this.seguridadService.logOut()
    location.reload();
  }
}
