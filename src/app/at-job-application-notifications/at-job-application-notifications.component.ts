import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobApplicationNotificationsService} from "../_services/jobApplicationNotification.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {JobApplicationNotificationModel} from "../_models/jobApplicationNotification.model";

@Component({
  selector: 'app-at-job-application-notifications',
  templateUrl: './at-job-application-notifications.component.html',
  styleUrls: ['./at-job-application-notifications.component.css']
})
export class AtJobApplicationNotificationsComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  userId: string;
  notifications: JobApplicationNotificationModel[];

  constructor(private route: ActivatedRoute,
              private notificationsService: JobApplicationNotificationsService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.userId = params['id'];

        this.notificationsService.getJobApplicationNotifications();
        this.notificationsService.jobApplicationNotificationsObserver.subscribe(
          (data: JobApplicationNotificationModel[]) => {
            this.notifications = data.filter(item =>
              item.idJobApplication.applicantid.idUser.id == this.userId
             );
          }
        );
    });
  }

  ngOnDestroy() {
  this.subscription.unsubscribe();
  }

  changeNotificationStatus(notification: JobApplicationNotificationModel) {
    if (notification.is_active == 'Y') {
      notification.is_active = 'N';
      this.notificationsService.updateJobApplicationNotification(notification);
    }
  }

}
