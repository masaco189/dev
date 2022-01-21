import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private angularFirestore: AngularFirestore) {}

  getUserDoc(id) {
    return this.angularFirestore
      .collection('user-collection')
      .doc(id)
      .valueChanges();
  }

  getUserList() {
    return this.angularFirestore
      .collection('user-collection')
      .snapshotChanges();
  }

  createUser(user: User) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('user-collection')
        .add(user)
        .then(
          (response) => resolve(response),
          (error) => reject(error)
        );
    });
  }

  enableDisableUser(id, action) {
    let status = 0;
    if (action === 'activar') {
      status = 1;
    }
    return this.angularFirestore.collection('user-collection').doc(id).update({
      status: status,
    });
  }

  updateUser(user: User, id) {
    return this.angularFirestore.collection('user-collection').doc(id).update({
      name: user.name,
      username: user.username,
      dni: user.dni,
      email: user.email,
      phone: user.phone,
      address: user.address,
      password: user.password,
      status: user.status,
    });
  }
}
