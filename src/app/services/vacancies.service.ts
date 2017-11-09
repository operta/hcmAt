import { Injectable } from '@angular/core';
import {VacancyModel} from '../models/vacancy.model';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class VacanciesService {

  vacanciesURL = 'http://localhost:8080/vacancies';

  constructor(private http: Http) { }

  getVacancies() {
    return this.http.get(this.vacanciesURL).map(
      (response: Response) => {
        const vacancies: VacancyModel[] = response.json();
        return vacancies;
      }
    );
  }

  getVacancy(id: string) {
    return this.http.get(this.vacanciesURL + '/' + id).map(
      (response: Response) => {
        const vacancy: VacancyModel = response.json();
        return vacancy;
      }
    );
  }

  saveVacancy(vacancy: VacancyModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    console.log(this.vacanciesURL + '/add');
    console.log(vacancy);
    this.http.post(this.vacanciesURL + '/add', JSON.stringify(vacancy), options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => console.log('RESPONSE:' + response)
    );


  }

  updateVacancy(vacancy: VacancyModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(vacancy);
    return this.http.put(this.vacanciesURL, body, {headers: headers})
      .map((response: Response) => response.json());
  }
}
