import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categories',
})
export class CategoriesPipe implements PipeTransform {
  transform(input: number): string {
    if (input === 0) {
      return 'Bakery';
    } else if (input === 1) {
      return 'Diary';
    } else if (input === 2) {
      return 'Drinks';
    } else if (input === 3) {
      return 'Fruits';
    } else if (input === 4) {
      return 'Vegetables';
    } else {
      return "";
    }
  }
}
