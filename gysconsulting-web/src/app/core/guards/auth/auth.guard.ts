import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const storage = localStorage.getItem('gys_ui');
    let userInSession = '';
    if (storage) {
      const decode = atob(storage);
      userInSession = JSON.parse(decode);
    }
    if (userInSession) {
      return true;
    } else {
      this.router.navigate(['login/']);
      return false;
    }
  }
}