import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public userIsLogged = false;
  public activeOption = '';
  public version;
  public widthSize = null;
  public showFiller = true;
  public title = 'maxgpay-panel';
  public toggleMenuWidthAppear = 991;
  public toggleMenuOpen = true;
  public mode = 'side';
  public id_admin = null;

  constructor(private router: Router, private authService: AuthService) {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?): any {
    this.widthSize = window.innerWidth;

    if (this.widthSize < this.toggleMenuWidthAppear) {
      this.toggleMenuOpen = false;
      this.mode = 'over';
    } else {
      this.toggleMenuOpen = true;
      this.mode = 'side';
    }
  }

  ngOnInit(): any {
    this.parseOptionBasedOnUrl(this.router.url);
  }
  
  parseOptionBasedOnUrl(option): void {
    switch (option) {
      case '/home':
        this.activeOption = 'home';
        break;
      default:
        this.activeOption = '';
        break;
    }
  }

  goToView(view: string, drawer: any): any {
    if (this.widthSize <= 991) {
      drawer.toggle();
    }
    this.activeOption = view;
    this.router.navigate(['home/' + view]);
  }
  goToLogin() {
    this.authService.logout();
    this.router.navigate(['login/']);
  }
}
