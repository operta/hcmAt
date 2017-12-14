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
  constructor(private router: Router, private applicantsService: ApplicantsService) { }

  ngOnInit() {
    this.loading = true;
    this.applicantsService.getApplicants();
     this.subscription = this.applicantsService.applicantChange.subscribe(
      (data: ApplicantModel[]) => {
        this.applicants = data;
        this.loading = false;
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
}
