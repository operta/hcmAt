import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {SkillGradeModel} from "../_models/skill-grade.model";
import {ToastsManager} from "ng2-toastr";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SkillGradesService {
  URL = 'http://77.78.198.19:8080/skillGrades';
  skillGrades: SkillGradeModel[];
  skillGradesObserver = new Subject<SkillGradeModel[]>();

  constructor(private toastr: ToastsManager, private http: Http) {
  }

  getSkillGrades(){
    return this.http.get(this.URL).map(
      (response: Response) => {
        const skillGrades: SkillGradeModel[] = response.json();
        return skillGrades;
      }
    ).subscribe(
      (data: SkillGradeModel[]) => {
        this.skillGrades = data;
        this.skillGradesObserver.next(this.skillGrades.slice());
      }
    );
  }

  updateSkillGrade(skillGrade: SkillGradeModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(skillGrade);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.skillGrades.map(item => skillGrade.id == item.id ? skillGrade : item);
        this.skillGradesObserver.next(this.skillGrades.slice());
        this.toastr.success(skillGrade.name + " successfully updated.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  addSkillGrade(skillGrade: SkillGradeModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(skillGrade);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.skillGrades.push(response.json());
        this.skillGradesObserver.next(this.skillGrades.slice());
        this.toastr.success(skillGrade.name + " successfully added.");
      }
    ).catch(
      (error: any) => {
        this.toastr.error( error.status, "An error occured");
        return Observable.throw(new Error(error.status));
      }
    ).subscribe();
  }

  removeSkillGrade(skillGrade: SkillGradeModel){
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + skillGrade.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        let index = this.skillGrades.indexOf(skillGrade);
        this.skillGrades.splice(index, 1);
        this.skillGradesObserver.next(this.skillGrades.slice());
        this.toastr.success(skillGrade.name + " successfully removed.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  // private skillGradeGradesUrl = 'http://77.78.198.19:8080/rgSkillGrades';  //URL to web api
  // private headers = new Headers({'Content-Type': 'application/json'});
  //
  // constructor(private http: Http) { }
  //
  // getSkillGradeGrades(selectedSkillGrade: SkillGradeModel): Promise<SkillGradeGrade[]> {
  //   if (selectedSkillGrade.id) {
  //     const url = `${this.skillGradeGradesUrl}/${selectedSkillGrade.id}/rgSkillGradeGrades`;
  //     return this.http.get(url)
  //               .toPromise()
  //               .then(response => response.json() as SkillGradeGrade[])
  //               .catch(this.handleError);
  //   }
  // }
  //
  // getSkillGrade(selectedSkillGrade: SkillGradeModel, id: number): Promise<SkillGradeGrade> {
  //   if (selectedSkillGrade) {
  //     const url = `${this.skillGradeGradesUrl}/${selectedSkillGrade.id}/rgSkillGradeGrades/${id}`;
  //     return this.http.get(url)
  //         .toPromise()
  //         .then(response => response.json() as SkillGradeGrade)
  //         .catch(this.handleError);
  //   }
  // }
  //
  // update(selectedSkillGrade: SkillGradeModel, skillGradeGrade: SkillGradeGrade): Promise<SkillGradeGrade> {
  //   if (selectedSkillGrade) {
  //     const url = `${this.skillGradeGradesUrl}/${selectedSkillGrade.id}/rgSkillGradeGrades/${skillGradeGrade.id}`;
  //     return this.http
  //       .put(url, JSON.stringify(skillGradeGrade), {headers: this.headers})
  //       .toPromise()
  //       .then(() => skillGradeGrade)
  //       .catch(this.handleError);
  //   }
  // }
  //
  // create(code: string, name: string, description: string, grade: number, numerical: string, idSkillGrade: number): Promise<SkillGradeGrade> {
  //   if (idSkillGrade) {
  //     const url = `${this.skillGradeGradesUrl}/${idSkillGrade}/rgSkillGradeGrades`;
  //     return this.http
  //       .post(url, JSON.stringify({code: code, name: name, description: description, grade: grade,
  //           numerical: numerical, idSkillGrade: idSkillGrade}), {headers: this.headers})
  //       .toPromise()
  //       .then(res => res.json() as SkillGradeGrade)
  //       .catch(this.handleError);
  //   }
  // }
  //
  // delete(selectedSkillGrade: SkillGradeModel, id: number): Promise<void> {
  //   if (selectedSkillGrade) {
  //     const url = `${this.skillGradeGradesUrl}/${selectedSkillGrade.id}/rgSkillGradeGrades/${id}`;
  //     return this.http.delete(url, {headers: this.headers})
  //       .toPromise()
  //       .then(() => null)
  //       .catch(this.handleError);
  //   }
  // }
  //
  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error); //for demo purposes only
  //   return Promise.reject(error.message || error);
  // }
}
