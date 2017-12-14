import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Applicant } from "./applicant.model";
import {ApplicantsService} from "../_services/applicants.service";
import {ApplicantModel} from "../_models/applicant.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})

export class ApplicantsComponent implements OnInit {
  applicants: ApplicantModel[];
  selectedRow: number = -1;
  advancedSearch: boolean = false;
  subscription: Subscription;
  loading: boolean = false;


  pages = [];
  resultCount = 15;
  page = 1;


  constructor(private router: Router, private applicantsService: ApplicantsService) { }

  ngOnInit() {
    this.loading = true;
    this.applicantsService.getApplicants();
     this.subscription = this.applicantsService.applicantChange.subscribe(
      (data: ApplicantModel[]) => {

        this.applicants = data;
        console.log(this.applicants);
        this.loading = false;
        this.pages = [];
        let numIndex = 1;
        for (let i = 0; i < this.applicants.length; i++) {
          if (i % this.resultCount === 0) {
            this.pages.push({num: numIndex});
            numIndex = numIndex + 1;
          }
        }
      }
    );
  }

  selectRow(rowIndex: number) {
    if (this.selectedRow === rowIndex) {
      this.router.navigate(['applicant']);
    }
    this.selectedRow = rowIndex;
  }

  setAdvancedSearch(advancedSearch: boolean) {
    this.advancedSearch = advancedSearch;
  }




  setPage(num: number) {
    this.page = num;
  }

  start() {
    return this.resultCount * this.page - this.resultCount;
  }

  end() {
    return this.resultCount * this.page;
  }

}
