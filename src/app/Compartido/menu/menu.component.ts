import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from '../../seguridad/servicios/seguridad.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router,
    private seguridadService:SeguridadService ) { }

    nombre:string = ''; 
  ngOnInit(): void {
   this.nombre= this.seguridadService.obtenerCampoJWT('email'); 
  }

  navegar(url:string){
    this.router.navigate([url]);
  }
  logOut(){
    this.seguridadService.logOut()
    location.reload();
  }
}
