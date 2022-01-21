import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PagesRoutingModule } from './pages-routing.module';
import { PreAuthModule } from './pre-auth/preAuth.module';

@NgModule({
  declarations: [
  ],

  imports: [
    CommonModule,
    PagesRoutingModule,
    PreAuthModule,
    BrowserAnimationsModule
  ]
})
export class PagesModule { }
