import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {LoginFailedComponent} from "./login-failed/login-failed.component";
import {RegisterComponent} from "./register/register.component";
import {GoogleMapDemo} from "./adminHome/admin-home/admin-home.component";


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'direction', component: GoogleMapDemo },
  { path: 'login-failed', component: LoginFailedComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/login' } // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
