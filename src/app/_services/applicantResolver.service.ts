import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {ApplicantsService} from "./applicants.service";
import {ApplicantModel} from "../_models/applicant.model";


@Injectable()
export class ApplicantResolver implements Resolve<ApplicantModel> {
  constructor(
    private applicantsService: ApplicantsService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.applicantsService.getApplicantByApplicantId(route.params['id'])
      .catch((err) => this.router.navigateByUrl('/'));

  }
}
