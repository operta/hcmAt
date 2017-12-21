import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation, Input} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../_services/user.service";
import {JobApplicationNotificationsService} from "../_services/jobApplicationNotification.service";
import {JobApplicationNotificationModel} from "../_models/jobApplicationNotification.model";
import {UserModel} from "../_models/user.model";
import {getHtmlTagDefinition} from "@angular/compiler";


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

  constructor(private router: Router, private userService: UserService, private notificationsService: JobApplicationNotificationsService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (data: UserModel) => {
        this.user = data
        console.log(this.user);
      }
    );
    this.notificationsService.getJobApplicationNotifications();
    this.notificationsService.jobApplicationNotificationsObserver.subscribe(
      (data: JobApplicationNotificationModel[]) => {
        this.notifications = data;
        this.countActiveNotifications(this.notifications);
      }
    )

    this.isAdmin = this.userService.isAdminUser();
  }

  logout(){
    this.userService.logout();
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

  countActiveNotifications(notifications: JobApplicationNotificationModel[]){
    this.activeNotificaitons = this.notifications.filter(item => item.is_active == 'Y');
    console.log(this.activeNotificaitons);
  }

  changeLanguage(language: string) {
    console.log(language);
    if (language === 'GB') {
      const html: NodeListOf<HTMLHtmlElement> = document.getElementsByTagName('html');

      html[0].setAttribute('dir', '');
    } else {
      const html: NodeListOf<HTMLHtmlElement> = document.getElementsByTagName('html');

      html[0].setAttribute('dir', 'rtl');
    }



  }

}
