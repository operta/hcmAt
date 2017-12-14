import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchStatusPipe'
})

@Injectable()
export class SearchStatusPipe implements PipeTransform {
  transform(items: any[], value: string): any[] {
    if (value == '')
      return items;
    if (!items) return [];
    return items.filter(it => it.status.status == value);
  }
}
