import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ApplicantSchoolsService} from "../../../_services/applicantSchools.service";
import {ApplicantSchoolModel} from "../../../_models/applicantSchool.model";
import {ApplicantModel} from "../../../_models/applicant.model";
import {QualificationsService} from "../../../_services/qualifications.service";
import {SchoolsService} from "../../../_services/schools.service";
import {SchoolModel} from "../../../_models/school.model";
import {QualificationModel} from "../../../_models/qualification";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-at-applicant-schools-list',
  templateUrl: './at-applicant-schools-list.component.html',
  styleUrls: ['./at-applicant-schools-list.component.css']
})
export class AtApplicantSchoolsListComponent implements OnInit, OnDestroy {

  @Input() applicant: ApplicantModel;
  @Output() currentSchool = new EventEmitter<ApplicantSchoolModel>();
  qualifications: QualificationModel[];
  schools: SchoolModel[];
  subscription: Subscription;

  applicantSchools: ApplicantSchoolModel[];

  constructor(private applicatSchoolsService: ApplicantSchoolsService, private schoolsService: SchoolsService, private qualificationsService: QualificationsService) { }

  ngOnInit() {
    this.applicatSchoolsService.getApplicantSchools(this.applicant)
    this.subscription = this.applicatSchoolsService.applicantSchoolsObserver.subscribe(
      (data: ApplicantSchoolModel[]) => {
        this.applicantSchools = data;
        this.currentSchool.emit(this.applicantSchools[0]);
      }
    );
    this.schoolsService.getSchools().subscribe(
      (data: SchoolModel[]) => {
        this.schools = data;
      }
    );

    this.qualificationsService.getQualifications().subscribe(
      (data: QualificationModel[]) => {
        this.qualifications = data;
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
