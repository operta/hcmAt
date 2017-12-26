import {Component, Input, OnInit} from '@angular/core';
import {JobApplicationTestModel} from '../../../_models/jobApplicationTest.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {RegionModel} from '../../../_models/region.model';
import {JobApplicationModel} from '../../../_models/jobApplication.model';
import {JsogService} from 'jsog-typescript';
import {AtJobApplicationsService} from '../../../_services/at-job-applications.service';
import {Router} from '@angular/router';
import {RegionsService} from '../../../_services/regions.service';
import {JobApplicationTestService} from '../../../_services/jobApplicationTest.service';

@Component({
  selector: 'app-at-job-applications-add-test',
  templateUrl: './at-job-applications-add-test.component.html',
  styleUrls: ['./at-job-applications-add-test.component.css']
})
export class AtJobApplicationsAddTestComponent implements OnInit {

  @Input() id: number;
  newTestForm: FormGroup;
  regions: RegionModel[];
  subscription1: Subscription;
  jobApplication: JobApplicationModel;

  constructor(private jsogService: JsogService, private jobApplicatiosService: AtJobApplicationsService, private router: Router, private regionsService: RegionsService, private jobApplicationTestService: JobApplicationTestService) { }

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
    this.newTestForm = new FormGroup({
      'score': new FormControl('', Validators.required),
      'review': new FormControl(''),
      'region': new FormControl('', Validators.required),
      'date': new FormControl('', Validators.required),
      'short_description': new FormControl('')
    });
  }

  onSubmit() {
    const score = this.newTestForm.value.score;
    const review = this.newTestForm.value.review;
    const region = this.newTestForm.value.region;
    const date = this.newTestForm.value.date;
    const short_description = this.newTestForm.value.short_description;
    const test = new JobApplicationTestModel(null, score, null, new Date(), null, new Date(), date, region, this.jsogService.serialize(this.jobApplication), short_description, review);
  this.jobApplicationTestService.saveTest(test);
    this.redirect();
  }
  redirect() {
    this.router.navigate(['dashboard', 'jobApplication', this.id]);
  }
}
