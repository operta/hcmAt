import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {UserModel} from "../_models/user.model";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";
import {ToastsManager} from "ng2-toastr";

@Injectable()
export class UserResolver implements Resolve<UserModel> {
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastsManager
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.userService.getUser()
      .catch((err) =>
        this.router.navigateByUrl('/')
      );
  }
}
