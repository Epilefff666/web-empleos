import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../servicios/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EsEmpresaGuard implements CanActivate {

  constructor(  private seguridadService:SeguridadService,private router:Router) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.seguridadService.obtenerRol()=== 'empresas'){
        return true;
      }
      else
      {
        this.router.navigate(['/ingresar'])
        return false;
      }
      
    
  }
  
}
