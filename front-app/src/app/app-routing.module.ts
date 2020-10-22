import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NoConnectedComponent } from './pages/no-connected/no-connected.component';
import { SigninComponent } from './components/signin/signin.component';
import { LoginComponent } from './components/login/login.component';
import { IsNoConnectedGuard } from './guards/is-no-connected.guard';
import { IsConnectedGuard } from './guards/is-connected.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate:[IsConnectedGuard],

  },
  {
    path: 'offline',
    component: NoConnectedComponent,
    canActivate:[IsNoConnectedGuard],
    children: [

      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'inscription',
        component: SigninComponent,
      }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
