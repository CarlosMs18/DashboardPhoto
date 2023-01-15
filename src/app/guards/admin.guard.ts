import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService :AuthService,
    private router :Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    if(this.authService.usuario.role === 'ADMIN_ROLE'){
      return true;
    }else{
       this.router.navigateByUrl('/dashboard');
       return false;
    }

  }

}
