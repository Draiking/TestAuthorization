import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
 
export class UserGuard implements CanActivate{

    constructor(
        private router: Router
    ){

    }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
         
       const token: any = localStorage.getItem('token')
  
       if (!token) {
           this.router.navigateByUrl('/login');
       } else if (token) {
           return true;
       }
       return false;
    }
}