import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchWorkplacePipe'
})

@Injectable()
export class SearchWorkplacePipe implements PipeTransform {
  transform(items: any[], value: string): any[] {
    if (value == '')
      return items;
    if (!items) return [];
    return items.filter(it => it.id_work_place.name == value);
  }
}
