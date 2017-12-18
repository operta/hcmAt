import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {RegionModel} from '../../../_models/region.model';
import {Subscription} from 'rxjs/Subscription';
import {RegionsService} from '../../../_services/regions.service';
import {JobApplicationInterviewModel} from '../../../_models/jobApplicationInterview.model';
import {JobApplicationInterviewService} from '../../../_services/jobApplicationInterview.service';
import {JobApplicationModel} from '../../../_models/jobApplication.model';
import {AtJobApplicationsService} from '../../../_services/at-job-applications.service';
import {JsogService} from "jsog-typescript";

@Component({
  selector: 'app-at-job-applications-add-interview',
  templateUrl: './at-job-applications-add-interview.component.html',
  styleUrls: ['./at-job-applications-add-interview.component.css']
})
export class AtJobApplicationsAddInterviewComponent implements OnInit {

  @Input() id: number;
  newInterviewForm: FormGroup;
  regions: RegionModel[];
  subscription1: Subscription;
  jobApplication: JobApplicationModel;

  constructor(private jsogService: JsogService, private jobApplicatiosService: AtJobApplicationsService, private router: Router, private regionsService: RegionsService, private jobApplicationInterviewService: JobApplicationInterviewService) { }

  ngOnInit() {
    this.subscription1 = this.regionsService.getRegions().subscribe(
      (data: RegionModel[]) => {
        this.regions = data;
      }
    );
    this.initForm();
    this.jobApplication = this.jobApplicatiosService.getJobApplicationById(+this.id);
  }

  initForm() {
    this.newInterviewForm = new FormGroup({
      'grade': new FormControl(''),
      'description': new FormControl(''),
      'region': new FormControl(''),
      'date': new FormControl(''),
      'time': new FormControl('')
    });
  }

  onSubmit() {
    const grade = this.newInterviewForm.value.grade;
    const description = this.newInterviewForm.value.description;
    const region = this.newInterviewForm.value.region;
    const date = this.newInterviewForm.value.date;

    const interview = new JobApplicationInterviewModel(null, grade, description, '', new Date(), '', new Date(), date, this.jsogService.serialize(this.jobApplication), region);
    this.jobApplicationInterviewService.saveInterview(interview);
    this.redirect();
  }
  redirect() {
    this.router.navigate(['dashboard', 'jobApplication', this.id]);
  }
}
