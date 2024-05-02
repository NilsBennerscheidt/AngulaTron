import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortNeod',
  standalone: true
})
export class SortNeodPipe implements PipeTransform {

  transform(value: any[]): any[] {
    // Assuming close_approach_data always has at least one element
    return value.sort((a, b) => {
      console.log(a, b)
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
