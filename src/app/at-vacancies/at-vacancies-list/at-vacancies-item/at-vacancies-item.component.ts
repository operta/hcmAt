import {
  Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {VacancyModel} from '../../../_models/vacancy.model';
import {VacanciesService} from '../../../_services/vacancies.service';
import {Router} from '@angular/router';
import {UserService} from "../../../_services/user.service";
import {RegionModel} from "../../../_models/region.model";
import {NgForm} from "@angular/forms";
import {UserModel} from "../../../_models/user.model";
import {ApplicantModel} from "../../../_models/applicant.model";
import {ApplicantsService} from "../../../_services/applicants.service";
import {JobApplicationModel} from "../../../_models/jobApplication.model";
import {AtJobApplicationsService} from "../../../_services/at-job-applications.service";
import {JobApplicationStatusModel} from "../../../_models/jobApplicationStatus.model";
import {VacanciesStatusModel} from "../../../_models/vacanciesStatus.model";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-at-vacancies-item',
  templateUrl: './at-vacancies-item.component.html',
  styleUrls: ['./at-vacancies-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AtVacanciesItemComponent implements OnInit, OnChanges {
  @ViewChild('cancelEdit') closeBtnEdit: ElementRef;
  @ViewChild('cancelApply') closeBtnApply: ElementRef;
  @Input() vacancy: VacancyModel;
  @Input() regions: RegionModel[];
  selectedRegion = null;

  isUser = false;
  isAdmin = false;
  isCompany = false;
  selectedStatus: string;
  applicant: ApplicantModel;
  applicantApplied = false;


  constructor(private userService: UserService,
              private vacancyService: VacanciesService,
              private router: Router,
              private applicantService: ApplicantsService,
              private jobApplicationService: AtJobApplicationsService,
              private toastr: ToastsManager) { }

  ngOnInit() {
    //change to company when company added!
    this.isCompany = this.userService.isAdmin;
    this.isAdmin = this.userService.isAdmin;
    this.isUser = this.userService.isUser();
    if (this.isUser) {
      this.getApplicantInformation();
    }
    this.selectedRegion = this.vacancy.id_location;
    this.selectedStatus = this.vacancy.status.status;
  }

  ngOnChanges() {
    this.checkApplicantApplied();
  }

  checkApplicantApplied() {
    if (this.vacancy.jobApplications == null || this.applicant == null){
      this.applicantApplied = false;
      return;
    }

      for(var i = 0; i < this.vacancy.jobApplications.length; i++) {
        if (this.vacancy.jobApplications[i].applicantid.id == this.applicant.id) {
          this.applicantApplied = true;
          return;
        }
      }
     this.applicantApplied = false;
  }

  onSubmitEdit(form: NgForm) {
    let status = this.vacancy.status;
    if (this.selectedStatus == 'ACTIVE') {
      status = new VacanciesStatusModel(1, 'ACTIVE');
    } else {
      status = new VacanciesStatusModel(2, 'CLOSED');
    }
    this.vacancy.name = form.value.name;
    this.vacancy.code = form.value.code;
    this.vacancy.description = form.value.description;
    this.vacancy.date_from = form.value.date_from;
    this.vacancy.date_to = form.value.date_to;
    this.vacancy.id_location = this.selectedRegion;
    this.vacancy.status = status;
    this.vacancy.job_role = '';
    this.vacancy.job_working_time = '';
    this.vacancy.skills_requirement = '';
    this.vacancy.language_requirement = '';
    this.vacancy.education_requirement = '';
    this.vacancy.experience_requirement = '';

    const updateVac = new VacancyModel(
      this.vacancy.id,
      this.vacancy.code,
      this.vacancy.name,
      this.vacancy.description,
      this.vacancy.id_location,
      this.vacancy.date_from,
      this.vacancy.date_to,
      null,
      null,
      null,
      new Date,
      null,
      this.vacancy.status,
      this.vacancy.job_role,
      this.vacancy.job_working_time,
      this.vacancy.skills_requirement,
      this.vacancy.language_requirement,
      this.vacancy.education_requirement,
      this.vacancy.experience_requirement
    );
    this.vacancyService.updateVacancy(updateVac);
    this.closeEditModal();
  }

  getApplicantInformation() {
    this.userService.getUser().subscribe(
      (user: UserModel) =>{
        this.applicantService.getApplicant(user.id).subscribe(
          (data: ApplicantModel) => {
            this.applicant = data;
            this.checkApplicantApplied();
          },
          error => {
            console.log(error);
            // this.toastr.error("You need to create applicant profile")
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  onRegionSelected(value: string){
    this.selectedRegion = this.regions.find(item => item.name === value);
  }

  onStatusSelected(value: string) {
    this.selectedStatus = value;
  }


  /*apply() {
    this.createJobApplication();
  }

  createJobApplication(){
    var status = new JobApplicationStatusModel(
      '1', null, null, null, null, null, null, null
    );
    var applicant = new ApplicantModel(
      this.applicant.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null
    );
    var vacancy = new VacancyModel(
      this.vacancy.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
    );
    var newJobApplication = new JobApplicationModel(
      null,
      applicant,
      vacancy,
      status,
      null,
      null,
      new Date,
      null,
      new Date,
      null,
      new Date,
      null,
      null,
      null,
      null
    );
    console.log(newJobApplication);
    this.jobApplicationService.addJobApplication(newJobApplication);
    this.closeApplyModal();
    this.applicantApplied = true;
  }

  private closeApplyModal(): void {
    this.closeBtnApply.nativeElement.click();
  } */

  private closeEditModal(): void {
    this.closeBtnEdit.nativeElement.click();
  }

  deleteVacancy(vacancy: VacancyModel) {
    this.vacancyService.deleteVacancy(vacancy.id);
  }


  vacDetailOpen() {
    this.router.navigate(['vacancies/', this.vacancy.id]);
  }



}
