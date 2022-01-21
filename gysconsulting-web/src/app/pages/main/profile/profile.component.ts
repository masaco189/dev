import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router'
import { getAuth } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  secretKey = 'secretKey';
  name:string;
  userName:string;
  userCedula:number;
  type:string;
  typeUser:string;
  email:string;
  uid:string;

  constructor(
    public userService: UserService,
    private router: Router,
    private angularAuth: AngularFireAuth,
  ) { }

  ngOnInit(): void {    
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const uid= user.uid
      this.userService.getUserDoc(uid).subscribe((user) => {
        this.name= user['name'];
        this.userName= user['username'];
        this.userCedula= user['dni'];
        this.type= user['type_of_dni'];
        this.typeUser= user['type_of_user'];
        this.email= user['email'];
      });
    }
  }
}

