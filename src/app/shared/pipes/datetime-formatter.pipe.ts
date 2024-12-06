import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormatter',
})
export class DateTimeFormatterPipe implements PipeTransform {
  transform(value: Date, ...args: unknown[]): unknown {
    const hour = value.getHours();
    const minutes = value.getMinutes();
    return `${('0' + hour).slice(-2)}:${('0' + minutes).slice(-2)}`;
  }
}
