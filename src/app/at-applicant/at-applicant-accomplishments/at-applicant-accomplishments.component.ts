import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AccomplishmentTypesService} from "../../_services/accomplishmentTypes.service";
import {AccomplishmentTypeModel} from "../../_models/accomplishmentType.model";
import {ApplicantModel} from "../../_models/applicant.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-at-applicant-accomplishments',
  templateUrl: './at-applicant-accomplishments.component.html',
  styleUrls: ['./at-applicant-accomplishments.component.css']
})
export class AtApplicantAccomplishmentsComponent implements OnInit, OnDestroy {
  @Input() applicant: ApplicantModel;
  accomplishmentTypes: AccomplishmentTypeModel[];
  selectedAccomplishmentType: AccomplishmentTypeModel;
  addAccomplishment: boolean;
  subscription: Subscription;

  constructor(private accomplishmentTypesService: AccomplishmentTypesService) { }

  ngOnInit() {
    this.addAccomplishment = false;
    this.subscription = this.accomplishmentTypesService.getAccomplishmentTypes().subscribe(
      (data: AccomplishmentTypeModel[]) => this.accomplishmentTypes = data
    );
  }

  setAccomplishmentType(name: string) {
    var result  = this.accomplishmentTypes.filter(function(o){return o.name == name;} );
    this.selectedAccomplishmentType = result[0];
    console.log(this.selectedAccomplishmentType);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
