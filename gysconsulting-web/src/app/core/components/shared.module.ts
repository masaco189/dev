import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    SidebarComponent,
    NavbarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
