import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { getAuth } from 'firebase/auth';
import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private angularAuth: AngularFireAuth,
    private router: Router,
    public userService: UserService,
    private angularStore: AngularFirestore
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public enabled: boolean;

  public emailExist(user: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.angularStore
        .collection('user-collection', (ref) =>
          ref.where('email', '==', user['email'])
        )
        .valueChanges({ idField: 'id' })
        .subscribe((rp) => {
          if (rp[0]?.id) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
  public isUserEnabled(email: string) {
    return this.angularStore
      .collection('user-collection', (ref) => ref.where('email', '==', email))
      .valueChanges()
      .subscribe((rp) => {
        let status = rp[0]['status'];
        this.enabled = false;

        if (status == 1) {
          this.enabled = true;
        }
      });
  }

  login(email, password) {
    this.angularAuth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        const auth = getAuth();
        const user = auth.currentUser;
        console.log('1', user.uid);

        if (user !== null) {
          const uid = user.uid;
          //console.log('2', uid);
          this.userService.getUserDoc(uid).subscribe((user) => {
            //console.log(user['status']);
            if (user['status'] == 1) {
              Swal.fire({
                icon: 'success',
                title: 'autorizado',
                text: 'Inicio de sesión exitoso',
              }).then(function () {
                localStorage.setItem(
                  'gys_ui',
                  btoa(JSON.stringify(resp['user']))
                );
                window.location.reload();
              });
              //this.router.navigate(['home/']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'inhabilitado',
                text: 'Usuario inhabilitado, por favor comunicate con el administrador',
              }).then(function () {
                window.location.reload();
              });
            }
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'error de autenticación',
          text: 'Usuario o contraseña incorrecto',
        });
      });
  }

  logout() {
    this.angularAuth.signOut();
    localStorage.removeItem('gys_ui');
  }
}
