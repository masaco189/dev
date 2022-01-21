import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { CheckLoginGuard } from '../core/guards/auth/check-login.guard';
/*import { AdminGuard } from '../core/guards/admin.guard';*/

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pre-auth/preAuth.module').then((m) => m.PreAuthModule),
    canActivate: [CheckLoginGuard],
  },
  //{ path: 'login', loadChildren: () => import('./pre-auth/preAuth.module').then(m => m.PreAuthModule) },
  {
    path: 'home',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard],
  },
  //{ path: 'home', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
