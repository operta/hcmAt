import {Component, Input, OnInit} from '@angular/core';
import {ApplicantSchoolModel} from "../../../_models/applicantSchool.model";
import {NgForm} from "@angular/forms";
import {QualificationModel} from "../../../_models/qualification";
import {SchoolModel} from "../../../_models/school.model";
import {ApplicantSchoolsService} from "../../../_services/applicantSchools.service";

@Component({
  selector: 'app-at-applicant-schools-item',
  templateUrl: './at-applicant-schools-item.component.html',
  styleUrls: ['./at-applicant-schools-item.component.css']
})
export class AtApplicantSchoolsItemComponent implements OnInit {
  @Input() applicantSchool: ApplicantSchoolModel;
  @Input() qualifications: QualificationModel[];
  @Input() schools: SchoolModel[];
  selectedSchool: SchoolModel;
  selectedQualification: QualificationModel;
  isEdit: boolean;

  constructor(private applicantSchoolService: ApplicantSchoolsService) { }

  ngOnInit() {
    this.selectedSchool = this.applicantSchool.id_school;
    this.selectedQualification = this.applicantSchool.id_qualification;
    this.isEdit = false;
  }

  onSubmit(form: NgForm){
    this.applicantSchool.id_qualification = this.selectedQualification;
    this.applicantSchool.degree = this.selectedQualification.name;
    this.applicantSchool.major = form.value.major;
    this.applicantSchool.date_from = form.value.date_from;
    this.applicantSchool.date_to = form.value.date_to;
    this.applicantSchool.grade = form.value.grade;
    this.applicantSchool.description = form.value.description;
    this.applicantSchool.link = form.value.link;
    this.applicantSchoolService.updateApplicantSchool(this.applicantSchool);
    this.isEdit = false;
  }

}
