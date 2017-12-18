import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {UserModel} from "../_models/user.model";
import {UserService} from "../_services/user.service";
import {PaginationService} from "../_services/pagination.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor() {

  }

  ngOnInit() {

  }
}
