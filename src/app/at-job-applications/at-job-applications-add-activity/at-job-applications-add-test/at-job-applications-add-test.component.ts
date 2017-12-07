import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-at-job-applications-add-test',
  templateUrl: './at-job-applications-add-test.component.html',
  styleUrls: ['./at-job-applications-add-test.component.css']
})
export class AtJobApplicationsAddTestComponent implements OnInit {

  @Input() id: number;

  constructor() { }

  ngOnInit() {
  }

}
