import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  Router
  constructor(private authService: AuthService,
              private router: Router ) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuth()
              .pipe(
                tap(status =>{
                  if(!status){
                    this.router.navigate(['/login'])
                  }
                } )
              );
  }

}
