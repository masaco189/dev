import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Inventory } from '../models/inventory.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(
    private angularFirestore: AngularFirestore,
    public router: Router
  ) {}

  getInventoryDoc(id) {
    return this.angularFirestore
      .collection('inventory-collection')
      .doc(id)
      .valueChanges();
  }

  getInventoryList() {
    return this.angularFirestore
      .collection('inventory-collection')
      .snapshotChanges();
  }

  createInventory(inventory: Inventory) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('inventory-collection')
        .add(inventory)
        .then(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Buen trabajo',
              text: 'Inventario creado con exito',
            }).then(function () {
              window.location.reload();
            });
          },
          (error) => reject(error)
        );
    });
  }
}
