import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "./user.service";
import {TOKEN_NAME} from "./auth.constant";
import {tokenNotExpired} from 'angular2-jwt';
import {ToastsManager} from "ng2-toastr";
import {LanguageService} from "./language.service";

@Injectable()
export class AuthGuard implements CanActivate {
  language = 'en';

  constructor(private toastr: ToastsManager,
              private router: Router,
              private userService: UserService,
              private languageService: LanguageService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (tokenNotExpired(TOKEN_NAME, this.userService.accessToken)) {
      return true;
    } else {
      if (this.language == 'en') {
        this.toastr.error('Authentication is required');
      } else {
        this.toastr.error( "يشترط التحقق من صحة الهوية");
      }

      this.router.navigate(['login'], {queryParams: {redirectTo: state.url}});
      return false;
    }
  }
}
