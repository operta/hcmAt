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
export class AtApplicantAccomplishmentsListComponent implements OnInit, OnDestroy {
  @Input() applicant: ApplicantModel;
  applicantAccomplishments: ApplicantAccomplishmentModel[];
  subscription: Subscription;

  constructor(private applicantAccomplishmentsService: ApplicantAccomplishmentsService) { }

  ngOnInit() {
    this.applicantAccomplishmentsService.getApplicantAccomplishments(this.applicant);
    this.subscription = this.applicantAccomplishmentsService.accomplishmentsObserver.subscribe(
      (data: ApplicantAccomplishmentModel[]) => {
        this.applicantAccomplishments = data;
        console.log(this.applicantAccomplishments);
      }
    );
  }

   checkAccomplishmentType(type:string) {
     var found = false;
     for(var i = 0; i < this.applicantAccomplishments.length; i++) {
       if (this.applicantAccomplishments[i].id_accomplishment_type.name == type) {
         found = true;
         break;
       }
     }
     return found;
   }

   ngOnDestroy(){
    this.subscription.unsubscribe();
   }

}
