import {Component, Input, OnInit} from '@angular/core';
import {JobApplicationModel} from "../../_models/jobApplication.model";
import {JobApplicationHistoryService} from "../../_services/jobApplicationHistory.service";
import {JobApplicationHistoryModel} from "../../_models/jobApplicationHistory.model";

@Component({
  selector: 'app-at-job-application-status-history',
  templateUrl: './at-job-application-status-history.component.html',
  styleUrls: ['./at-job-application-status-history.component.css']
})
export class AtJobApplicationStatusHistoryComponent implements OnInit {
  @Input() jobApplication: JobApplicationModel;
  history: JobApplicationHistoryModel[];

  constructor(private jobApplicationHistoryService: JobApplicationHistoryService) { }

  ngOnInit() {
    this.jobApplicationHistoryService.getJobApplicationHistoryByJobApplicationId(this.jobApplication.id.toString()).subscribe(
      (data: JobApplicationHistoryModel[]) => {
        this.history = data;
      }
    )
  }

}
