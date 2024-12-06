import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDoubleDigit',
})
export class TimeDoubleDigitPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return ('0' + value).slice(-2);
  }
}
