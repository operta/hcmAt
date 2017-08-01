import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

declare  let $:any;

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('sideMenu') sideMenu: ElementRef;

  constructor() { }

  ngOnInit() {
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
