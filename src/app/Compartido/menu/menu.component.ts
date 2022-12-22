import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from '../../seguridad/servicios/seguridad.service';
import { EmpresasService } from '../../empresas/servicios/empresas.service';
import { PostulantesService } from '../../postulantes/servicios/postulantes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router,
    private seguridadService:SeguridadService,
    private empresasService: EmpresasService,
    private postulantesService:PostulantesService  ) { }

  modelo:any;
  nombre:string = ''; 
  foto:any;
  ngOnInit(): void {
   this.nombre= this.seguridadService.obtenerCampoJWT('email'); 
   this.empresasService.obtenerEmpresaEmail(this.nombre)
   .subscribe((modelo)=>{ 
    if(modelo !== null) {
      this.modelo=modelo 
      this.foto =modelo.foto_perfil; 
      localStorage.setItem("perfilID",this.modelo.id)
      this.router.navigate(['inicio']);
    }else{
      this.postulantesService.obtenerPerfilEmail(this.nombre)
      .subscribe((modelo)=>{
        this.modelo=modelo 
        this.foto =modelo.foto_perfil; 
        localStorage.setItem("perfilID",this.modelo.id)
        this.router.navigate(['inicio']);
      })
    }
    
  });

     
  }

  navegar(url:string){
    this.router.navigate([url]);
  }
  logOut(){
    this.seguridadService.logOut()
    window.location.reload();
  }
}
