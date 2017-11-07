import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Applicant } from "./applicant.model";

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})

export class ApplicantsComponent implements OnInit {
  private applicants: Applicant[] = [
    new Applicant(1, 'Tiger Nixon', 'Male', '01.01.1900.', 'Some Address 1/15', 'Edinburgh', 'Scotland', 'UK', 'Master Degree', 'System Architect', 'No'),
    new Applicant(2, 'Garrett Winters', 'Male', '01.01.1900.', 'Some Address 1/15', 'Tokyo', '', 'Japan', 'Undergraduate Degree', 'Accountant', 'Yes'),
    new Applicant(3, 'Ashton Cox', 'Male', '01.01.1900.', 'Some Address 1/15', 'San Francisco', 'San Francisco', 'USA', 'Master Degree', 'Junior Technical Author', 'Yes'),
    new Applicant(4, 'Cedric Kelly', 'Male', '01.01.1900.', 'Some Address 1/15', 'Edinburgh', 'Scotland', 'UK', 'Master Degree', 'Senior Javascript Developer', 'Yes'),
    new Applicant(5, 'Airi Satou', 'Female', '01.01.1900.', 'Some Address 1/15', 'Tokyo', '', 'Japan', 'Master Degree', 'Accountant', 'Yes'),
    new Applicant(6, 'Brielle Williamson', 'Female', '01.01.1900.', 'Some Address 1/15', 'New York', 'New York', 'USA', 'Undergraduate Degree', 'Integration Specialist', 'Yes'),
    new Applicant(7, 'Herrod Chandler', 'Male', '01.01.1900.', 'Some Address 1/15', 'San Francisco', 'San Francisco', 'USA', 'Master Degree', 'Sales Assistant', 'Yes'),
    new Applicant(8, 'Rhona Davidson', 'Female', '01.01.1900.', 'Some Address 1/15', 'Tokyo', '', 'Japan', 'Master Degree', 'Integration Specialist', 'Yes'),
    new Applicant(9, 'Colleen Hurst', 'Female', '01.01.1900.', 'Some Address 1/15', 'San Francisco', 'San Francisco', 'USA', 'Undergraduate Degree', 'Javascript Developer', 'No'),
    new Applicant(10, 'Sonya Frost', 'Female', '01.01.1900.', 'Some Address 1/15', 'Edinburgh', 'Scotland', 'UK', 'Master Degree', 'Software Engineer', 'Yes'),
    new Applicant(11, 'Jena Gaines', 'Female', '01.01.1900.', 'Some Address 1/15', 'London', 'England', 'UK', 'Master Degree', 'Office Manager', 'Yes'),
    new Applicant(12, 'Quinn Flynn', 'Male', '01.01.1900.', 'Some Address 1/15', 'Edinburgh', 'Scotland', 'UK', 'Master Degree', 'Support Lead', 'No'),
    new Applicant(13, 'Charde Marshall', 'Male', '01.01.1900.', 'Some Address 1/15', 'San Francisco', 'San Francisco', 'USA', 'Master Degree', 'Regional Director', 'Yes'),
    new Applicant(14, 'Haley Kennedy', 'Female', '01.01.1900.', 'Some Address 1/15', 'London', 'England', 'UK', 'Master Degree', 'Senior Marketing Designer', 'Yes'),
    new Applicant(15, 'Tatyana Fitzpatrick', 'Female', '01.01.1900.', 'Some Address 1/15', 'London', 'England', 'UK', 'Master Degree', 'Regional Director', 'Yes')
  ];
  selectedRow: number = -1;
  advancedSearch: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
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
