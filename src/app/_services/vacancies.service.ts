import {Injectable} from '@angular/core';
import {VacancyModel} from '../_models/vacancy.model';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import 'rxjs/Rx';
import {JsogService} from 'jsog-typescript';

@Injectable()
export class VacanciesService {
  private vacancies: VacancyModel[];
  vacancyChange= new Subject<VacancyModel[]>();

  vacanciesURL = 'http://localhost:8080/vacancies';

  constructor(private http: Http) { }



  getVacancies() {
    this.http.get(this.vacanciesURL).map(
      (response: Response) => {
        // const vacancies: VacancyModel[] = (<VacancyModel[]>this.jsog.deserialize(response.json()));
        const vacancies: VacancyModel[] = response.json();

        return vacancies;
      }
    ).subscribe(
      (data: VacancyModel[]) => {
        this.vacancies = data;
        this.vacancyChange.next(this.vacancies.slice());
      }
    );
  }

  // made for getting vacancy detail
  getVacancy(id: number) {
    return this.vacancies.find( vacancy => vacancy.id === id);
/*    return this.http.get(this.vacanciesURL + '/' + id ).map(
      (response: Response) => {
        const vacancy: VacancyModel = response.json();
        return vacancy;
      }
    );*/
  }

  saveVacancy(vacancy: VacancyModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    console.log(this.vacanciesURL + '/add');
    console.log(vacancy);
    this.http.post(this.vacanciesURL + '/add', vacancy, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        console.log('RESPONSE:' + response);
        this.vacancies.push(vacancy);
        this.vacancyChange.next(this.vacancies.slice());
      }
    );

  }

  updateVacancy(vacancy: VacancyModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(vacancy);
    return this.http.put(this.vacanciesURL, body, {headers: headers})
      .map((response: Response) => response.json());
  }
}
