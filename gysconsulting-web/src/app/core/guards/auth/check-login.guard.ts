import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginGuard implements CanActivate {
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
    let userInSessionLogin = 'login/';
    if (storage) {
      const decode = atob(storage);
      userInSession = JSON.parse(decode);
      userInSessionLogin = JSON.parse(decode);
    }
    if (!userInSession || !userInSessionLogin) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
