import {Component, Input, OnInit} from '@angular/core';
import {JobApplicationModel} from '../../../_models/jobApplication.model';
import {ApplicantModel} from '../../../_models/applicant.model';
import {JobApplicationStatusModel} from '../../../_models/jobApplicationStatus.model';
import {AtJobApplicationsService} from '../../../_services/at-job-applications.service';
import {VacancyModel} from '../../../_models/vacancy.model';
import {JobApplicationHistoryService} from "../../../_services/jobApplicationHistory.service";


@Component({
  selector: 'app-at-vacancies-detail-item',
  templateUrl: './at-vacancies-detail-item.component.html',
  styleUrls: ['./at-vacancies-detail-item.component.css']
})
export class AtVacanciesDetailItemComponent implements OnInit {

  @Input() jobApplication: JobApplicationModel;
  currentStatus: JobApplicationStatusModel;
  @Input() applicant: ApplicantModel;
  @Input() jobApplicationStatuses: JobApplicationStatusModel[];
  selectedStatus: JobApplicationStatusModel;
  interviewsAvg = 0;
  testsAvg = 0;
  totalAvg = 0;

  changeStatus = false;

  constructor(private jobApplicationService: AtJobApplicationsService) { }

  ngOnInit() {
    this.currentStatus = this.jobApplication.id_status;
    console.log(this.applicant);
    console.log(this.jobApplication);
    this.jobApplication.interview.forEach(x => {this.interviewsAvg = this.interviewsAvg + x.grade});
    console.log(this.interviewsAvg);
    this.interviewsAvg = this.interviewsAvg / this.jobApplication.interview.length;
    console.log(this.interviewsAvg);
    this.jobApplication.test.forEach(x => { this.testsAvg = this.testsAvg + x.score});
    this.testsAvg = this.testsAvg / this.jobApplication.test.length;
    this.totalAvg = (this.testsAvg + this.interviewsAvg) / 2;
  }

  updateStatus(status: JobApplicationStatusModel){
    const newStatus = new JobApplicationStatusModel(
      status.id, null, status.name, null, null, null, null, null
    );
    const applicant = new ApplicantModel(
      this.jobApplication.applicantid.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null
    );
    const vacancy = new VacancyModel(
      this.jobApplication.vacancyid.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
    );
    this.jobApplication.id_status = newStatus;
    this.jobApplication.vacancyid = vacancy;
    this.jobApplication.applicantid = applicant;
    console.log(this.jobApplication);
    this.jobApplicationService.updateJobApplication(this.jobApplication, this.currentStatus);
    this.currentStatus = this.jobApplication.id_status;

  }

  // function that dynamically creates the circle for the grade
  getBar(grade: number) {
    // create switch for different grades
    if (!grade) {
      return 'css-bar-0';
    }
    if (grade === 0) {
      return 'css-bar-0';
    } else if (grade <= 5) {
      return 'css-bar-5';
    } else if (grade <= 10) {
      return 'css-bar-10';
    } else if (grade <= 15) {
      return 'css-bar-15';
    } else if (grade <= 20) {
      return 'css-bar-20';
    } else if (grade <= 25) {
      return 'css-bar-25';
    } else if (grade <= 30) {
      return 'css-bar-30';
    } else if (grade <= 35) {
      return 'css-bar-35';
    } else if (grade <= 40) {
      return 'css-bar-40';
    } else if (grade <= 45) {
      return 'css-bar-45';
    } else if (grade <= 50) {
      return 'css-bar-50';
    } else if (grade <= 55) {
      return 'css-bar-55';
    } else if (grade <= 60) {
      return 'css-bar-60';
    } else if (grade <= 65) {
      return 'css-bar-65';
    } else if (grade <= 70) {
      return 'css-bar-70';
    } else if (grade <= 75) {
      return 'css-bar-75';
    } else if (grade <= 80) {
      return 'css-bar-80';
    } else if (grade <= 85) {
      return 'css-bar-85';
    } else if (grade <= 90) {
      return 'css-bar-90';
    } else if (grade < 100) {
      return 'css-bar-95';
    } else if (grade === 100) {
      return 'css-bar-100';
    } else {
      return 'css-bar-0';
    }
  }
}
