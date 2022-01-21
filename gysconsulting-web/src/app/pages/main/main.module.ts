import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MainRoutingModule } from './main-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProfileComponent } from './profile/profile.component'
import { HomeComponent } from './home/home.component'
import { MainComponent } from './main.component'
import { FooterComponent } from 'src/app/core/components/footer/footer.component'

// AM Modules
import { MatSliderModule } from '@angular/material/slider'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatStepperModule } from '@angular/material/stepper'
import { MatGridListModule } from '@angular/material/grid-list'
import { UserManagerComponent } from './user-manager/user-manager.component'
import { CoreModule } from '../../core/core.module'
import { SharedModule } from '../../core/components/shared.module'
import { MatTabsModule } from '@angular/material/tabs'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSelectModule } from '@angular/material/select'
import { ChartsModule } from 'ng2-charts'
import { SignaturePadModule } from 'angular2-signaturepad'
import { MaterialFileInputModule } from 'ngx-material-file-input'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatFileUploadModule } from 'angular-material-fileupload'

@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent,
    UserManagerComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatSliderModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatDatepickerModule,
    MatStepperModule,
    MatGridListModule,
    SharedModule,
    MatTabsModule,
    MatSidenavModule,
    ChartsModule,
    MatSelectModule,
    SignaturePadModule,
    MaterialFileInputModule,
    MatToolbarModule,
    MatFileUploadModule
  ],
  bootstrap: [ MainComponent ],
})
export class MainModule {}
