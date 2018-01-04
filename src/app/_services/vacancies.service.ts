import {Injectable} from '@angular/core';
import {VacancyModel} from '../_models/vacancy.model';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import 'rxjs/Rx';
import {JsogService} from 'jsog-typescript';
import {ToastsManager} from "ng2-toastr";
import {JobApplicationModel} from "../_models/jobApplication.model";
import {LanguageService} from "./language.service";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class VacanciesService {
  private vacancies: VacancyModel[] = [];
  vacancyChange= new Subject<VacancyModel[]>();
  vacanciesURL = 'http://localhost:8080/vacancies';
  language = 'en';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });

  constructor(private toastr: ToastsManager,
              private http: Http,
              private jsog: JsogService,
              private languageService: LanguageService,
              private authenticationService: AuthenticationService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }

  // getVacanciesWithRefresh(refresh: boolean) {
  //
  //   this.http.get(this.vacanciesURL).map(
  //     (response: Response) => {
  //       const vacancies: VacancyModel[] = (<VacancyModel[]>this.jsog.deserialize(response.json()));
  //       return vacancies;
  //     }
  //   ).subscribe(
  //     (data: VacancyModel[]) => {
  //       this.vacancies = data;
  //       this.vacancyChange.next(this.vacancies.slice());
  //     },
  //     error => {
  //       this.toastr.error( error.status, "An error occured");
  //     }
  //   );
  // }

  addJobApplicationToVacancy(jobApplication: JobApplicationModel){
    this.vacancies.filter(item => item.id === jobApplication.vacancyid.id)[0].jobApplications.push(jobApplication);

  }

  vacancyServiceHasVacancies() {

    if (this.vacancies.length == 0)
      return false;
    else{
      this.vacancyChange.next(this.vacancies.slice());
      return true;
    }

  }



  getVacancies() {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
      this.http.get(this.vacanciesURL, options).map(
        (response: Response) => {
          const vacancies: VacancyModel[] = (<VacancyModel[]>this.jsog.deserialize(response.json()));
          return vacancies;
        }
      ).subscribe(
        (data: VacancyModel[]) => {
          this.vacancies = data;
          this.vacancyChange.next(this.vacancies.slice());
        },
        error => {
          if (this.language == 'en') {
            this.toastr.error(error.status, "An error occured");
          } else {
            this.toastr.error(error.status, "تم حدوث خط");
          }
        }
      );

  }

  getActiveVacancies() {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    this.http.get(this.vacanciesURL + '/active', options).map(
      (response: Response) => {
        const vacancies: VacancyModel[] = (<VacancyModel[]>this.jsog.deserialize(response.json()));
        // const vacancies: VacancyModel[] = response.json();

        return vacancies;
      }
    ).subscribe(
      (data: VacancyModel[]) => {
        this.vacancies = data;
        this.vacancyChange.next(this.vacancies.slice());
      },
      error => {
        if (this.language == 'en') {
          this.toastr.error(error.status, "An error occured");
        } else {
          this.toastr.error(error.status, "تم حدوث خط");
        }
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
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    this.http.post(this.vacanciesURL + '/add', vacancy, options).map(
      (response: Response) => {
        return response.json();
      }
    ).subscribe(
      response => {
        this.vacancies.push(response);
        this.vacancyChange.next(this.vacancies.slice());
        if (this.language == 'en') {
          this.toastr.success(vacancy.name + " successfully added.");
        } else {
          this.toastr.success(vacancy.name + " تم الاضافة بنجاح");
        }
      },
      error => {
        if (this.language == 'en') {
          this.toastr.error(error.status, "An error occured");
        } else {
          this.toastr.error(error.status, "تم حدوث خط");
        }
      }
    );
  }

  updateVacancy(vacancy: VacancyModel) {
    const headers = this.authHeaders;
    const body = JSON.stringify(vacancy);
    return this.http.put(this.vacanciesURL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.vacancies.map(item => item.id == vacancy.id ? vacancy : item);
        this.vacancyChange.next(this.vacancies.slice());
        if (this.language == 'en') {
          this.toastr.success(vacancy.name + " successfully updated.");
        } else {
          this.toastr.success(vacancy.name + " تم التحديث بنجاح");
        }
      },
      error => {
        if (this.language == 'en') {
          this.toastr.error(error.status, "An error occured");
        } else {
          this.toastr.error(error.status, "تم حدوث خط");
        }
      }
    );
  }

  deleteVacancy(id: number) {
    const headers = this.authHeaders;
    this.http.delete(this.vacanciesURL + '/delete/' + id, {headers: headers}).subscribe(
      (response: Response) => {
        this.vacancies = this.vacancies.filter(vacancy => vacancy.id !== id);
        this.vacancyChange.next(this.vacancies.slice());
        if (this.language == 'en') {
          this.toastr.success("Vacancy successfully removed.");
        } else {
          this.toastr.success("تم ازالة الشاغر بنجاح");
        }

      },
      error => {
        if (this.language == 'en') {
          this.toastr.error(error.status, "An error occured");
        } else {
          this.toastr.error(error.status, "تم حدوث خط");
        }
      }
    );

  }
}
