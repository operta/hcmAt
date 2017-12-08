import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SchoolsService} from "../../_services/schools.service";
import {SchoolModel} from "../../_models/school.model";
import {ApplicantSchoolModel} from "../../_models/applicantSchool.model";
import {ApplicantModel} from "../../_models/applicant.model";
import {QualificationsService} from "../../_services/qualifications.service";
import {QualificationModel} from "../../_models/qualification";
import {ApplicantSchoolsService} from "../../_services/applicantSchools.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-applicant-education-add',
  templateUrl: './applicant-education-add.component.html',
  styleUrls: ['../applicant.component.css']
})
export class ApplicantEducationAddComponent implements OnInit, OnDestroy {
  @Input() applicant: ApplicantModel;
  @Output() onClose = new EventEmitter();
  schools: SchoolModel[];
  selectedSchool: SchoolModel;
  qualifications: QualificationModel[];
  selectedQualification: QualificationModel;
  subscription: Subscription;

  constructor(private schoolsService: SchoolsService, private qualificationsService: QualificationsService, private applicantSchoolsService: ApplicantSchoolsService) {}

  ngOnInit() {
    this.schoolsService.getSchools().subscribe(
      (data: SchoolModel[]) => {
        this.schools = data;
      }
    );

    this.qualificationsService.getQualifications();
    this.subscription = this.qualificationsService.qualificationsObserver.subscribe(
      (data: QualificationModel[]) => {
        this.qualifications = data;
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
     var applicantSchool = new ApplicantSchoolModel(
       null,
       this.selectedSchool,
       this.applicant,
       this.selectedSchool.name,
       form.value.dateFrom,
       form.value.date_to,
       form.value.major,
       this.selectedQualification.name,
       this.selectedQualification,
       form.value.grade,
       form.value.description,
       form.value.link,
       null,
       new Date,
       null,
       new Date
     );

     this.applicantSchoolsService.addApplicantSchool(applicantSchool);
    this.close()
  }

  close(){
    this.onClose.emit();
  }



}
