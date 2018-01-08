export class PagingModel {
  public last: number;
  public totalElements: number;
  public totalPages: number;
  public size: number;
  public number: number;
  public sort: number;
  public first: number;
  public numberOfElements: number;


  constructor(last: number, totalElements: number, totalPages: number, size: number, number: number, sort: number, first: number, numberOfElements: number) {
    this.last = last;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.size = size;
    this.number = number;
    this.sort = sort;
    this.first = first;
    this.numberOfElements = numberOfElements;
  }
}
