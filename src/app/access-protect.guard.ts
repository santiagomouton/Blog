import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessProtectGuard implements CanActivate {

  constructor( private router: Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLogin()
  }


  isLogin(): boolean {
    if( sessionStorage.getItem( "session" ) !== null ){
      return true
    }
    this.router.navigate( ['/login'] )
    return false
  }

  
}
