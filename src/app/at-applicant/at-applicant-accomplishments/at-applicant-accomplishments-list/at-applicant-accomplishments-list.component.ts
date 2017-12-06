import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApplicantAccomplishmentsService} from "../../../_services/applicantAccomplishments.service";
import {ApplicantModel} from "../../../_models/applicant.model";
import {ApplicantAccomplishmentModel} from "../../../_models/applicantAccomplishment.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-at-applicant-accomplishments-list',
  templateUrl: './at-applicant-accomplishments-list.component.html',
  styleUrls: ['./at-applicant-accomplishments-list.component.css']
})
export class AtApplicantAccomplishmentsListComponent implements OnInit {
  @Input() applicant: ApplicantModel;
  @Input() applicantAccomplishments: ApplicantAccomplishmentModel[];

  constructor() { }

  ngOnInit() {
  }

   checkAccomplishmentType(type:string):boolean {
     // var found = false;
     // for(var i = 0; i < this.applicantAccomplishments.length; i++) {
     //   if (this.applicantAccomplishments[i].id_accomplishment_type.name == type) {
     //     found = true;
     //     break;
     //   }
     // }
     // return found;
     return true;
   }

}
