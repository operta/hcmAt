import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}

