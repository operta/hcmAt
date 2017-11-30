import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../_services/user.service";

declare  let $:any;

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('sideMenu') sideMenu: ElementRef;
  isAdmin: boolean;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
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
}
