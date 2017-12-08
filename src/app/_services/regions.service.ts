import { Injectable } from '@angular/core';
import {RegionModel} from '../_models/region.model';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Subject} from "rxjs/Subject";
import {ToastsManager} from "ng2-toastr";
import {Observable} from "rxjs/Observable";

@Injectable()
export class RegionsService {
  URL = 'http://localhost:8080/regions';
  regions: RegionModel[];
  regionsObserver = new Subject<RegionModel[]>();

  constructor(private toastr: ToastsManager, private http: Http) {
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
    return this.http.get(this.URL).map(
      (response: Response) => {

        const regions: RegionModel[] = response.json();
        console.log(regions);
        this.regions = regions;
        this.regionsObserver.next(this.regions.slice());
        return regions;
      }
    );
  }

  getCities() {
    return this.http.get(this.URL + '/cities').map(
      (response: Response) => {
        const regions: RegionModel[] = response.json();
        return regions;
      }
    );
  }

  getCountries() {
    return this.http.get(this.URL + '/countries').map(
      (response: Response) => {
        const regions: RegionModel[] = response.json();
        return regions;
      }
    );
  }

  getRRegions() {
    return this.http.get(this.URL + '/regions').map(
      (response: Response) => {
        const regions: RegionModel[] = response.json();
        return regions;
      }
    );
  }

  updateRegion(region: RegionModel) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(region);
    return this.http.put(this.URL, body, {headers: headers}).map(
      (response: Response) => response.json()
    ).subscribe(
      response => {
        this.regions.map(item => item.id == region.id ? region : item);
        this.regionsObserver.next(this.regions.slice());
        this.toastr.success(region.name + " successfully updated.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }

  addRegion(region: RegionModel) {
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(region);
    this.http.post(this.URL + '/add', body, options).map(
      (response: Response) => {
        this.regions.push(response.json());
        this.regionsObserver.next(this.regions.slice());
        this.toastr.success(region.name + " successfully added.");
      }
    ).catch(
      (error: any) => {
        this.toastr.error( error.status, "An error occured");
        return Observable.throw(new Error(error.status));
      }
    ).subscribe();
  }

  removeRegion(region: RegionModel){
    const headers = new Headers({'Content-type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    this.http.delete(this.URL + '/remove' + '/' + region.id, options).map(
      (response: Response) => {
        console.log(response);
      }
    ).subscribe(
      response => {
        let index = this.regions.indexOf(region);
        this.regions.splice(index, 1);
        this.regionsObserver.next(this.regions.slice());
        this.toastr.success(region.name + " successfully removed.");
      },
      error => {
        this.toastr.error( error.status, "An error occured");
      }
    );
  }


}
