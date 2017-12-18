import {Subject} from "rxjs/Subject";

export class PaginationService {
  pages = [];
  resultCount = 15;
  page = 1;
  pagesObserver = new Subject<any[]>();
  startObserver = new Subject<number>();
  endObserver = new Subject<number>();


  setResultCount(num: number) {
    this.resultCount = num;
  }

  setPage(num: number) {
    this.page = num;
    console.log(this.page)
    this.startObserver.next(this.start());
    this.endObserver.next(this.end());
  }

  start() {
    return this.resultCount * this.page - this.resultCount;
  }

  end() {
    return this.resultCount * this.page;
  }

  setPages(length: number) {
    this.pages = [];
    this.page = 1;
    // pagination number of pages
    let numIndex = 1;
    for (let i = 0; i < length; i++) {
      if (i % this.resultCount === 0) {
        this.pages.push({num: numIndex});
        numIndex = numIndex + 1;
      }
    }

    this.pagesObserver.next(this.pages);
  }

}
