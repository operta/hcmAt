import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from "@angular/router";

import { Applicant } from "./applicant.model";
import {ApplicantsService} from "../_services/applicants.service";
import {ApplicantModel} from "../_models/applicant.model";
import {Subscription} from "rxjs/Subscription";
import {PaginationService} from "../_services/pagination.service";

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})

export class ApplicantsComponent implements OnInit, OnDestroy {
  applicants: ApplicantModel[];
  selectedRow: number = -1;
  advancedSearch: boolean = false;
  subscription: Subscription;
  loading: boolean = false;

  start: number;
  end: number;


  constructor(private paginationService: PaginationService, private router: Router, private applicantsService: ApplicantsService) { }

  ngOnInit() {
    this.loading = true;
    this.applicantsService.getApplicants();
     this.subscription = this.applicantsService.applicantChange.subscribe(
      (data: ApplicantModel[]) => {
        this.applicants = data;
        this.loading = false;
        this.paginationService.setPages(this.applicants.length);
        this.start = this.paginationService.start();
        this.paginationService.startObserver.subscribe(
          start => this.start = start
        )
        this.end = this.paginationService.end();
        this.paginationService.endObserver.subscribe(
          end => this.end = end
        );
      }
    );
  }

  ngOnDestroy() {
    this.paginationService.setPages(0);
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
}
