import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable ,  pipe, tap} from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService : AuthService,
    private router :Router
  ){}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.renewToken()
              .pipe(
                tap(esAutenticado => {
                  if(!esAutenticado){
                      this.router.navigateByUrl('/login')
                  }
                })
              )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    return this.authService.renewToken()
              .pipe(
                tap(esAutenticado => {
                  if(!esAutenticado){
                      this.router.navigateByUrl('/login')
                  }
                })
              )
  }

}
