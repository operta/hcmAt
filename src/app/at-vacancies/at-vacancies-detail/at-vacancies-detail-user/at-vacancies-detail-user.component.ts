import {Component, Input, OnInit} from '@angular/core';
import {VacancyModel} from '../../../_models/vacancy.model';
import {VacanciesService} from '../../../_services/vacancies.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JobApplicationStatusModel} from '../../../_models/jobApplicationStatus.model';
import {ApplicantModel} from '../../../_models/applicant.model';
import {JobApplicationModel} from '../../../_models/jobApplication.model';
import {AtJobApplicationsService} from '../../../_services/at-job-applications.service';
import {UserModel} from '../../../_models/user.model';
import {UserService} from '../../../_services/user.service';
import {ApplicantsService} from '../../../_services/applicants.service';

@Component({
  selector: 'app-at-vacancies-detail-user',
  templateUrl: './at-vacancies-detail-user.component.html',
  styleUrls: ['./at-vacancies-detail-user.component.css']
})
export class AtVacanciesDetailUserComponent implements OnInit {

  vacancy: VacancyModel;
  id: string;
  applicantId: number;
  applied = true;
  loading = false;

  constructor(private vacancyService: VacanciesService, private router: Router, private applicantService: ApplicantsService, private userService: UserService, private jobApplicationService: AtJobApplicationsService, private vacanciesService: VacanciesService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.vacancyService.vacancyObservable.subscribe(
    data => this.vacancy = data
    );

    this.route.params.subscribe(
      params => {

        this.id = params['id'];

        if (!this.vacancyService.vacancyServiceHasVacancies()) {
          this.vacancyService.getVacancyHTTP(+this.id);
          this.loading = true;
          this.getApplicantInformation();
        } else {
          this.vacancy = this.vacanciesService.getVacancy(+this.id);
          this.loading = true;
          this.getApplicantInformation();
        }
      }
    );



  }



  userWithoutApplicantProfile() {
    if (this.userService.isUser() && !this.applicantId)
      return true;
    else {
      return false;
    }
  }

  navigateToApplicantProfile() {
    this.router.navigateByUrl('/dashboard/applicant');
  }

  getApplicantInformation() {
    if (this.userService.isUser()) {
      this.userService.getUser().subscribe(
        (data: UserModel) => {
          this.applicantService.getApplicant(data.id).subscribe(
            (applicant: ApplicantModel) => {
              if (applicant)
                this.applicantId = applicant.id;
              if (!this.vacancy.jobApplications.find(x => x.applicantid.id === this.applicantId)) {
                this.applied = false;
                this.loading = false;
              }
            },
            error => {
              console.log(error);
              this.loading = false;
            }
          );
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      );
    }

  }

  apply() {
    this.createJobApplication();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  createJobApplication() {
    const status = new JobApplicationStatusModel(
      '1', null, null, null, null, null, null, null
    );
    const applicant = new ApplicantModel(
      +this.applicantId, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null
    );
    const vacancy = new VacancyModel(
      this.vacancy.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
    );
    const newJobApplication = new JobApplicationModel(
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
    this.jobApplicationService.addJobApplication(newJobApplication);
    this.applied = true;
  }
}
