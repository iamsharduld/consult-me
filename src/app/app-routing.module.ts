import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { DiagnosisHelperComponent } from './diagnosis-helper/diagnosis-helper.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'diagnosis-helper', component: DiagnosisHelperComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
];

/* for reference
  { path: '**', redirectTo: 'login' }, // wildcard
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }