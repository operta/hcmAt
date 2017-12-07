import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-at-job-applications-add-activity',
  templateUrl: './at-job-applications-add-activity.component.html',
  styleUrls: ['./at-job-applications-add-activity.component.css']
})
export class AtJobApplicationsAddActivityComponent implements OnInit, OnDestroy {
  id: number;
  add: string;
  subscription1: Subscription;
  subscription2: Subscription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription1 = this.route.parent.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    );
    this.subscription2 = this.route.queryParams.subscribe(
      (params: Params) => {
        this.add = params['add'];
      }
    )
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }



}
