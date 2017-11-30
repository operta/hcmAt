import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {QualificationModel} from "../_models/qualification";

@Injectable()
export class QualificationsService{

  URL = 'http://localhost:8080/qualifications';

  constructor(private http: Http) { }

  getQualifications (){
    return this.http.get(this.URL).map(
      (response: Response) => {
        const qualification: QualificationModel[] = response.json();
        return qualification;
      }
    );
  }
}
