import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortNeodByDate',
  standalone: true
})
export class SortNeodByDatePipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value.sort((a, b) => {
      return new Date(a.date).getTime() - 
             new Date(b.date).getTime();
    });
  }

}
