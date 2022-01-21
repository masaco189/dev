import { Component, OnInit } from '@angular/core';
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  public loginForm: any = null;
  public creating = false
  public error = null
  public activeOption = ''
  public widthSize = null
  errorMessage = '';

  constructor(
  private angularAuth: AngularFireAuth,
  private fb: FormBuilder,
  private authService: AuthService,
  private router: Router) { }
  login() {
    this.authService.login(this.email, this.password)
  }
  
  ngOnInit(): void {
  }
}