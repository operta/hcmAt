import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accomplishmentTypePipe'
})
export class AccomplishmentTypePipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.id_accomplishment_type.name == filter);
  }
}
