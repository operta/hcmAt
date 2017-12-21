import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation, Input} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../_services/user.service";
import {JobApplicationNotificationsService} from "../_services/jobApplicationNotification.service";
import {JobApplicationNotificationModel} from "../_models/jobApplicationNotification.model";
import {UserModel} from "../_models/user.model";
import {getHtmlTagDefinition} from "@angular/compiler";
import {TranslateService} from "ng2-translate";


declare  let $:any;

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SideMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('sideMenu') sideMenu: ElementRef;
  user: UserModel;
  isAdmin: boolean;
  state: string;
  notifications: JobApplicationNotificationModel[];
  activeNotificaitons: JobApplicationNotificationModel[];

  constructor(private router: Router,
              private userService: UserService,
              private notificationsService: JobApplicationNotificationsService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (data: UserModel) => {
        this.user = data;
      }
    );
    this.notificationsService.getJobApplicationNotifications();
    this.notificationsService.jobApplicationNotificationsObserver.subscribe(
      (data: JobApplicationNotificationModel[]) => {
        this.notifications = data.filter(item => item.idJobApplication.applicantid.idUser.id === this.user.id );
        this.countActiveNotifications(this.notifications);
      }
    );

    this.isAdmin = this.userService.isAdminUser();
  }

  ngAfterViewInit() {
    $(".preloader").fadeOut();
    ($(this.sideMenu.nativeElement)).metisMenu();
    $('.slimscrollsidebar').slimScroll({
      height: '100%'
      , position: 'right'
      , size: "0px"
      , color: '#dcdcdc'
      , });
  }


  logout() {
    this.userService.logout();
  }

  countActiveNotifications(notifications: JobApplicationNotificationModel[]) {
    this.activeNotificaitons = this.notifications.filter(item => item.is_active === 'Y');
  }

  changeLanguage(language: string) {
    console.log(language);
    if (language === 'GB') {
      const html: NodeListOf<HTMLHtmlElement> = document.getElementsByTagName('html');
      this.translate.use('en');
      html[0].setAttribute('dir', '');
    } else {
      const html: NodeListOf<HTMLHtmlElement> = document.getElementsByTagName('html');
      html[0].setAttribute('dir', 'rtl');
      this.translate.use('ar');
    }
  }

  navigateToNotifications() {
    this.router.navigate(['/dashboard/notifications', this.user.id])
  }

  changeNotificationStatus(notification: JobApplicationNotificationModel) {
    if (notification.is_active == 'Y') {
      notification.is_active = 'N';
      this.notificationsService.updateJobApplicationNotification(notification);
    }
  }


}
