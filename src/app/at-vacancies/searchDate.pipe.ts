import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDatePipe'
})

@Injectable()
export class SearchDatePipe implements PipeTransform {
  transform(items: any[], from: Date, to: Date): any[] {

    if (from == null && to == null) {return items}
    if (!items) {return []}
    if (from != null && to == null) {
      return items.filter(it => new Date(from).getTime() <= new Date(it.date_from).getTime()
      );
    }
    if (to != null && from == null) {
      return items.filter(it =>
        new Date(to).getTime() >= new Date(it.date_to).getTime()
      );
    }
    if (from != null && to != null) {
      return items.filter(it =>
        new Date(from).getTime() <= new Date(it.date_from).getTime()
        &&  new Date(to).getTime() >= new Date(it.date_to).getTime());
    }
  }
}
