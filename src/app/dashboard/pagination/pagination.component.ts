import { Component, OnInit } from '@angular/core';
import {PagingService} from "../../_services/paging.service";
import {PaginationService} from "../../_services/pagination.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  pages = [];
  resultCount: number;
  vacancyList: boolean;
  totalElements: number;
  numberOfElements: number;

  constructor(private pagingService: PagingService, private paginationService: PaginationService) {}
  ngOnInit() {

    this.pagingService.vacancylist.subscribe(
      data => {
        this.vacancyList = data;
      }
    );
    this.pagingService.pagesObserver.subscribe(
      data => {
        this.pages = data;
        this.totalElements = this.pagingService.totalElements;
        this.numberOfElements = this.pagingService.numberOfElements;
      }
    );
    this.paginationService.pagesObserver.subscribe(
      data => {
        this.pages = data;
      }
    );
  if (this.vacancyList) {
    this.pages = this.pagingService.pages;

    this.resultCount = this.pagingService.resultCount;
  } else {
    this.pages = this.paginationService.pages;

    this.resultCount = this.paginationService.resultCount;

    }
  }

  setPage(num: number) {
    if (this.vacancyList) {
      this.pagingService.setPage(num);
    } else {
      this.paginationService.setPage(num);
    }
  }
  decrementPage() {
    if (this.vacancyList) {
      this.pagingService.setPage(this.pagingService.page - 1);
    } else {
      this.paginationService.setPage(this.paginationService.page - 1);
    }
  }

  incrementPage() {
    if (this.vacancyList) {
      this.pagingService.setPage(this.pagingService.page + 1);
    } else {
      this.paginationService.setPage(this.paginationService.page + 1);
    }

  }

  compare(num: number) {
    if (this.vacancyList) {
      return this.pagingService.page === num;
    } else {
      return this.paginationService.page === num;

    }
  }

  first() {
    console.log(this.pagingService.first);
    return this.pagingService.first;
  }


  last() {
    return this.pagingService.last;
  }
}

