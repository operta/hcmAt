import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDatePipe'
})

@Injectable()
export class SearchDatePipe implements PipeTransform {
  transform(items: any[], from: Date, to: Date): any[] {

    if (from == null && to == null)
      return items;
    if (!items) return [];
    if(from != null && to == null){
      const fromDate = new Date(from.getTime());
      console.log(fromDate);
      return items.filter(it => {
        //Date.parse(it.date_from) > fromDate
      });
    }
    if(to != null && from == null) {
      return items.filter(it =>
        it.date_to.getTime() <= to.getTime()
      );
    }
    if(from != null && to != null){
      return items.filter(it => it.date_to.getTime() <= to.getTime() && it.date_from.getTime() >= from.getTime());
    }


  }
}
