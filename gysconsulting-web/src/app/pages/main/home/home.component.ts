import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, MultiDataSet } from 'ng2-charts';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad';
import { SymbolDisplayPartKind } from 'typescript';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { InventoryService } from 'src/app/core/services/inventory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inventory } from 'src/app/core/models/inventory.model';
import { MatDialog } from '@angular/material/dialog';
import { finalize, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import Swal from 'sweetalert2';
import { getAuth } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;
  uploadPercent: Observable<Number>;
  urlImage: Observable<String>;
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  datos = [
    {
      activeName: '',
      plateNumber: '',
      activeState: '',
      activeQuantity: '',
      functionaryName: '',
      functionaryIdentification: '',
      functionarySignature: '',
      activeReference: '',
      activeSerial: '',
      activeLocation: '',
      photo: '',
      other: '',
      status: 1,
      date: new Date(),
    },
  ];
  img: '';
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  signaturePadOptions: Object = {
    minWidth: 1,
    canvasWidth: 700,
    canvasHeight: 100,
  };
  spinner: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    public inventoryService: InventoryService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private storage: AngularFireStorage,
    private angularAuth: AngularFireAuth
  ) {}
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    //console.log(this.signaturePad.toDataURL());
    this.datos[0].functionarySignature = this.signaturePad.toDataURL();
  }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      placaCtrl: ['', Validators.required],
      estadoCtrl: ['', Validators.required],
      cantidadCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      funcionarioCtrl: ['', Validators.required],
      cedulaCtrl: ['', Validators.required],
      //firmaCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      referenciaCtrl: ['', Validators.required],
      serialCtrl: ['', Validators.required],
      localizacionCtrl: ['', Validators.required],
      otroCtrl: [],
      fotoCtrl: ['', Validators.required],
    });
  }

  primerPaso() {}
  segundoPaso() {}
  guardarPaso(datosInventario: Inventory) {
    this.spinner = true;
    const id = Math.random().toString(36).substring(2);
    const file = datosInventario.photo['files'][0];
    const filePath = `uploads/inventary_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((res) => {
            //console.log(JSON.stringify(res));
            datosInventario.photo = JSON.stringify(res);
            this.spinner = false;
            this.inventoryService
              .createInventory(datosInventario)
              .then(() => {})
              .catch(function (error) {
                console.log(
                  'Hubo un problema con la petición Fetch:' + error.message
                );
              });
          });
        })
      )
      .subscribe();
  }
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          //console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }
  public clear() {
    this.signaturePad.clear();
  }
  // End
}
