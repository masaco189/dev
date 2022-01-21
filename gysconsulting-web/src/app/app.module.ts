import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { PagesModule } from './pages/pages.module'

import { MatSidenavModule } from '@angular/material/sidenav'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
// import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CoreModule } from './core/core.module'
import { MatExpansionModule } from '@angular/material/expansion'
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from './core/components/shared.module'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from 'src/environments/environment'
import { InventoryService } from './core/services/inventory.service'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatToolbarModule } from '@angular/material/toolbar' 
import { MatInputModule } from '@angular/material/input'
import { MatFileUploadModule } from 'angular-material-fileupload'

//import { environment } from 'src/environments/environment.prod'

@NgModule({
  declarations: [AppComponent],

  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    CoreModule,
    HttpClientModule,
    MatExpansionModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MatCarouselModule,
    MatProgressSpinnerModule,
    // MatTabsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    PagesModule,
    SharedModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatInputModule,
    MatFileUploadModule,
  ],
  exports:[ MatToolbarModule ],
  providers: [InventoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
