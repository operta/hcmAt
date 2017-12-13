import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {QualificationModel} from "../_models/qualification";
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";

@Injectable()
export class QualificationsService{
  URL = 'http://localhost:8080/qualifications';
  qualifications: QualificationModel[];
  qualificationsObserver = new Subject<QualificationModel[]>();

  constructor(private toastr: ToastsManager, private http: Http) {
  }

  getQualifications(){
    return this.http.get(this.URL).map(
      (response: Response) => {
        const qualifications: QualificationModel[] = response.json();
        return qualifications;
      }
    ).subscribe(
      (data: QualificationModel[]) => {
        this.qualifications = data;
        this.qualificationsObserver.next(this.qualifications.slice());
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  updateQualification(qualification: QualificationModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(qualification);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.qualifications.map(qualification => qualification.id == qualification.id ? qualification : qualification);
        this.qualificationsObserver.next(this.qualifications.slice());
        this.toastr.success(qualification.name + " successfully updated.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  addQualification(qualification: QualificationModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(qualification);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.qualifications.push(response.json());
        this.qualificationsObserver.next(this.qualifications.slice());
        this.toastr.success(qualification.name + " successfully added.");
      }
    ).catch(
      (error: any) => {
        this.toastr.error( error.status, "An error occured");
        return Observable.throw(new Error(error.status));
      }
    ).subscribe();
  }

  removeQualification(qualification: QualificationModel){
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + qualification.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        let index = this.qualifications.indexOf(qualification);
        this.qualifications.splice(index, 1);
        this.qualificationsObserver.next(this.qualifications.slice());
        this.toastr.success(qualification.name + " successfully removed.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }
}
