import { Component, OnInit } from '@angular/core';
import {PaginationService} from "../../_services/pagination.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  pages = [];
  resultCount: number;

  constructor(private paginationService: PaginationService) {}
  ngOnInit() {
    this.pages = this.paginationService.pages;
    this.paginationService.pagesObserver.subscribe(
      data => {
        this.pages = data;
      }
    );
    this.resultCount = this.paginationService.resultCount;

  }

  setPage(num: number) {
    this.paginationService.setPage(num);
  }
  decrementPage() {
    this.paginationService.setPage(this.paginationService.page - 1);
  }
  incrementPage() {
    this.paginationService.setPage(this.paginationService.page + 1);
  }

  compare(num: number) {

    return this.paginationService.page === num;

  }
}
