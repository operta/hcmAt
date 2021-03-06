import { Injectable } from '@angular/core';
import {RegionModel} from '../_models/region.model';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";
import {LanguageService} from "./language.service";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class RegionsService {
  URL = 'http://localhost:8080/regions';
  regions: RegionModel[];
  regionsObserver = new Subject<RegionModel[]>();
  language = 'en';

  private authHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });


  constructor(private toastr: ToastsManager,
              private http: Http,
              private languageService: LanguageService,
              private authenticationService: AuthenticationService) {
    this.languageService.getLanguage();
    this.languageService.languageObservable.subscribe((language: string) => this.language = language);
  }

  // getRegions(){
  //   return this.http.get(this.URL).map(
  //     (response: Response) => {
  //       const regions: RegionModel[] = response.json();
  //       return regions;
  //     }
  //   ).subscribe(
  //     (data: RegionModel[]) => {
  //       this.regions = data;
  //       this.regionsObserver.next(this.regions.slice());
  //     },
  //     error => {
  //       this.toastr.error( error.status, "An error occured");
  //     }
  //   );
  // }


  getRegions() {
    const headers = this.authHeaders;
    return this.http.get(this.URL, {headers: headers}).map(
      (response: Response) => {
        const regions: RegionModel[] = response.json();
        this.regions = regions;
        this.regionsObserver.next(this.regions.slice());
        return regions;
      }
    );
  }

  getCities() {
    const headers = this.authHeaders;
    return this.http.get(this.URL + '/cities', {headers: headers}).map(
      (response: Response) => {
        const regions: RegionModel[] = response.json();
        return regions;
      }
    );
  }

  getCountries() {
    const headers = this.authHeaders;
    return this.http.get(this.URL + '/countries', {headers: headers}).map(
      (response: Response) => {
        const regions: RegionModel[] = response.json();
        return regions;
      }
    );
  }

  getRRegions() {
    const headers = this.authHeaders;
    return this.http.get(this.URL + '/regions', {headers: headers}).map(
      (response: Response) => {
        const regions: RegionModel[] = response.json();
        return regions;
      }
    );
  }

  updateRegion(region: RegionModel) {
    const headers = this.authHeaders;
    const body = JSON.stringify(region);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.regions.map(item => item.id == region.id ? region : item);
        this.regionsObserver.next(this.regions.slice());
        if (this.language == 'en') {
          this.toastr.success(region.name + " successfully updated.");
        } else {
          this.toastr.success(region.name + " تم التحديث بنجاح");
        }
      },
      error => {
        if (this.language == 'en') {
          this.toastr.error( error.status, "An error occured");
        } else {
          this.toastr.error( error.status, "تم حدوث خط");
        }
      }
    );
  }

  addRegion(region: RegionModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(region);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.regions.push(response.json());
        this.regionsObserver.next(this.regions.slice());
        if (this.language == 'en') {
          this.toastr.success(region.name + " successfully added.");
        } else {
          this.toastr.success(region.name + " تم الاضافة بنجاح");
        }
      }
    ).catch(
      (error: any) => {
        if (this.language == 'en') {
          this.toastr.error( error.status, "An error occured");
        } else {
          this.toastr.error( error.status, " تم حدوث خط");
        }
        return Observable.throw(new Error(error.status));
      }
    ).subscribe();
  }

  removeRegion(region: RegionModel) {
    const headers = this.authHeaders;
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + region.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        const index = this.regions.indexOf(region);
        this.regions.splice(index, 1);
        this.regionsObserver.next(this.regions.slice());
        if (this.language == 'en') {
          this.toastr.success(region.name + " successfully removed.");
        } else {
          this.toastr.success(region.name + " تم الازالة بنجاح");
        }

      },
      error => {
        if (this.language == 'en') {
          this.toastr.error( error.status, "An error occured");
        } else {
          this.toastr.error( error.status, "تم حدوث خط");
        }
      }
    );
  }


}
