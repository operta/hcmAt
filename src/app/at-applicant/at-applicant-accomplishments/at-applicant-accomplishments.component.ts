import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AccomplishmentTypesService} from "../../_services/accomplishmentTypes.service";
import {AccomplishmentTypeModel} from "../../_models/accomplishmentType.model";
import {ApplicantModel} from "../../_models/applicant.model";
import {Subscription} from "rxjs/Subscription";
import {ApplicantAccomplishmentsService} from "../../_services/applicantAccomplishments.service";
import {ApplicantAccomplishmentModel} from "../../_models/applicantAccomplishment.model";

@Component({
  selector: 'app-at-applicant-accomplishments',
  templateUrl: './at-applicant-accomplishments.component.html',
  styleUrls: ['./at-applicant-accomplishments.component.css']
})
export class AtApplicantAccomplishmentsComponent implements OnInit, OnDestroy {
  @Input() applicant: ApplicantModel;
  applicantAccomplishments: ApplicantAccomplishmentModel[];
  accomplishmentTypes: AccomplishmentTypeModel[];
  selectedAccomplishmentType: AccomplishmentTypeModel;
  addAccomplishment: boolean;
  subscription: Subscription;
  subscription2: Subscription;

  constructor(private accomplishmentTypesService: AccomplishmentTypesService, private applicantAccomplishmentsService: ApplicantAccomplishmentsService) { }

  ngOnInit() {
    this.addAccomplishment = false;
    this.subscription = this.accomplishmentTypesService.getAccomplishmentTypes().subscribe(
      (data: AccomplishmentTypeModel[]) => this.accomplishmentTypes = data
    );
    this.applicantAccomplishmentsService.getApplicantAccomplishments(this.applicant);
    this.subscription2 = this.applicantAccomplishmentsService.accomplishmentsObserver.subscribe(
      (data: ApplicantAccomplishmentModel[]) => {
        this.applicantAccomplishments = data;
      }
    );
  }

  setAccomplishmentType(name: string) {
    var result  = this.accomplishmentTypes.filter(function(o){return o.name == name;} );
    this.selectedAccomplishmentType = result[0];
  }

  onClose(){
    this.addAccomplishment = false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
