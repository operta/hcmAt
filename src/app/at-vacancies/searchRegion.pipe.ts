import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchRegionPipe'
})

@Injectable()
export class SearchRegionPipe implements PipeTransform {
  transform(items: any[], value: string): any[] {
    if (value == '')
      return items;
    if (!items) return [];
    return items.filter(it =>
        it.id_location.name == value
    );
  }
}
