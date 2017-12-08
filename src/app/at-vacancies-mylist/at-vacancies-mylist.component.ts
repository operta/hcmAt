import {Component, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {VacancyModel} from "../_models/vacancy.model";
import {VacanciesService} from "../_services/vacancies.service";
import {AtJobApplicationsService} from "../_services/at-job-applications.service";
import {JobApplicationModel} from "../_models/jobApplication.model";

@Component({
  selector: 'app-at-vacancies-mylist',
  templateUrl: './at-vacancies-mylist.component.html',
  styleUrls: ['./at-vacancies-mylist.component.css']
})
export class AtVacanciesMylistComponent implements OnInit, OnDestroy {

  options: number[] = [1, 10, 15, 20, 25, 30];
  pages = [{num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5}];
  resultCount = 15;
  page = 1;
  /*  subscription: Subscription;*/
  private vacancies: VacancyModel[];
  private jobApplications: JobApplicationModel[];

  constructor(private jobApplicationsService: AtJobApplicationsService, private vacanciesService: VacanciesService) {
  }

  ngOnInit() {
    /*this.subscription =*/
    this.jobApplicationsService.getJobApplicationsByApplicantId(1);
    this.jobApplicationsService.jobApplicationsChange.subscribe(
      data => {
        this.jobApplications = data;
        console.log(this.jobApplications[0].vacancyid);
      }
    );
    /*.subscribe(
      (data: VacancyModel[]) => {
        this.vacancies = data;
        console.log(this.vacancies);
      }
    );*/
  }

  ngOnDestroy() {
  }

  setResultCount(num: number) {
    this.resultCount = num;
  }

  setPage(num: number) {
    this.page = num;

    if (this.page === this.pages[this.pages.length - 1].num) {
      this.pages.forEach(page => page.num = page.num + 2);
      console.log(this.pages);
    }

    if (this.page === this.pages[0].num && this.pages[0].num !== 1) {
      this.pages.forEach(page => page.num = page.num - 2);
    }
    /*    if (num === this.pages.length) {
          this.pages.forEach(x => x = x + 2);
        }

        if (num === this.pages[0]) {
          this.pages.forEach(x => x = x - 2);
        }*/
  }

  start() {
    return this.resultCount * this.page - this.resultCount;
  }

  end() {
    return this.resultCount * this.page;
  }
}
