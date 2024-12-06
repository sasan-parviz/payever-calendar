import { computed, Injectable, signal } from '@angular/core';

import { CalendarDay } from '../../shared/interfaces';
import { chunkArray } from '../../shared/utils';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  selectedDate = signal(new Date());
  month = computed(() => this.selectedDate().getMonth());
  year = computed(() => this.selectedDate().getFullYear());

  // When pass 0 as day it will return last day of month
  daysInMonthCount = computed(() =>
    new Date(this.year(), this.month() + 1, 0).getDate()
  );

  weekDayOfFirstDayOfMonth = computed(() =>
    new Date(this.year(), this.month(), 1).getDay()
  );

  calendarRows = computed<CalendarDay[][]>(() =>
    chunkArray(
      [
        ...Array(this.weekDayOfFirstDayOfMonth()).fill({
          label: '',
          value: null,
        }),
        ...Array.from({ length: this.daysInMonthCount() }, (_, i) => ({
          label: i + 1,
          value: new Date(this.year(), this.month(), i + 1),
        })),
      ],
      7
    )
  );

  setSelectedDate(date: Date): void {
    this.selectedDate.set(date);
  }
}
