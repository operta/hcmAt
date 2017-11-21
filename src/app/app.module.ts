import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import {SharedModule} from './_shared/shared.module';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import {DashboardModule} from "./dashboard/dashboard.module";
import {AppRoutingModule} from "./app-routing.module";
import {TOKEN_NAME} from "./_services/auth.constant";
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {AuthenticationService} from "./_services/authentication.service";
import {UserService} from "./_services/user.service";
import {UserStatusService} from "./_services/userStatus.service";
import {AuthGuard} from "./_services/auth-guard.service";
import {AdminAuthGuard} from "./_services/admin-auth-guard.service";

export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    tokenName: TOKEN_NAME,
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: false,
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    DashboardModule
  ],
  providers: [
    {provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http]},
    AuthenticationService,
    UserService,
    UserStatusService,
    AuthGuard,
    AdminAuthGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
