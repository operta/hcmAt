import {Subject} from 'rxjs/Subject';

export class PagingService {
  pages = [];
  resultCount = 15;
  page: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  numberOfElements: number;
  vacancylist = new Subject<boolean>();
  // when changing page
  pageObservable = new Subject<number>();
  // when changing the pages array
  pagesObserver = new Subject<any[]>();


  setResultCount(num: number) {
    this.resultCount = num;
  }

  setPage(num: number) {
    this.page = num;
    this.pageObservable.next(this.page);
  }

  setPages(numOfPages: number, page: number) {
    // pagination number of pages
    if (numOfPages === 0) {
      this.pages = [];
      this.pagesObserver.next(this.pages);
      return;
    }

    this.pages = [];
    let numIndex = page - 2;

    if (page === 0 || page === 1) {
      numIndex = 0;
    }
    if (page === numOfPages) {
      numIndex -= 2;
    }
    if (page === numOfPages - 1 && page > 2) {
      numIndex--;
    }

    for (let i = numIndex; i < page + 3 && i < numOfPages; i++) {
        this.pages.push({num: numIndex});

      numIndex = numIndex + 1;
    }

    this.pagesObserver.next(this.pages);
  }
}
