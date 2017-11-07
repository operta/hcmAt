import { Injectable } from '@angular/core';
import {Vacancy} from '../at-vacancies/vacancy.model';
import { Http, Response } from '@angular/http';


@Injectable()
export class VacanciesService {

  vacancies: Vacancy[];
  vacanciesURL = 'http://localhost:8080/vacancies';

  constructor(private http: Http) { }

  getVacancies(){
    return this.http.get(this.vacanciesURL).map(
      (response: Response) => {
        const vacancies: Vacancy[] = response.json();
        return vacancies;
      }
    );
  }

  getVacancy(id: string) {
    return this.http.get(this.vacanciesURL + '/' + id).map(
      (response: Response) => {
        const vacancy: Vacancy = response.json();
        return vacancy;
      }
    );
  }
}
