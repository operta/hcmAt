import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VacancyModel} from '../../models/vacancy.model';
import {Subscription} from 'rxjs/Subscription';
import {VacanciesService} from '../../services/vacancies.service';
import {ActivatedRoute, Params} from '@angular/router';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-at-vacancies-edit',
  templateUrl: './at-vacancies-edit.component.html',
  styleUrls: ['./at-vacancies-edit.component.css']
})
export class AtVacanciesEditComponent implements OnInit, OnDestroy {

  @Input() vacancy: VacancyModel;


  id: string;
  subscriptionParams: Subscription;
  subscriptionVacancy: Subscription;
  submitted: boolean

  constructor(private vacancyService: VacanciesService) {
  }

  ngOnInit() {
    this.submitted = false;
  }


  ngOnDestroy() {
    this.subscriptionParams.unsubscribe();
    this.subscriptionVacancy.unsubscribe();
  }

  onSubmit(form: NgForm) {
    this.vacancy.name = form.value.name;
    this.vacancy.code = form.value.code;
    this.vacancy.description = form.value.description;
    this.vacancy.date_from = form.value.date_from;
    this.vacancy.date_to = form.value.date_to;
    //this.vacancy.region = form.value.region;

    // this.subscriptionVacancy = this.vacancyService.updateVacancy(this.vacancy)
    //   .subscribe(
    //   result => console.log(result)
    // );

    this.vacancyService.updateVacancy(this.vacancy)
      .subscribe(
        result => console.log(result)
      );
    this.submitted = true;


  }
}
