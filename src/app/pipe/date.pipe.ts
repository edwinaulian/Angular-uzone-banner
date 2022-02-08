import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'date'
})

export class DatePipes implements PipeTransform {

  transform(value: string) {
    var datePipe = new DatePipe("id");
     value = datePipe.transform(value, 'dd MMMM yyyy');
     return value;
 }

}

