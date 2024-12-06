import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { CalendarStore } from '../../store';
import { Month } from '../../shared/interfaces';
import { DateFormatterPipe } from '../../shared/pipes';

@Component({
  selector: 'app-calendar-view',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    DateFormatterPipe,
  ],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.css',
})
export class CalendarViewComponent {
  month: WritableSignal<number>;
  year: WritableSignal<number>;
  months: Month[] = [
    { value: 0, label: 'Jan' },
    { value: 1, label: 'Feb' },
    { value: 2, label: 'Mar' },
    { value: 3, label: 'Apr' },
    { value: 4, label: 'May' },
    { value: 5, label: 'Jun' },
    { value: 6, label: 'Jul' },
    { value: 7, label: 'Aug' },
    { value: 8, label: 'Sep' },
    { value: 9, label: 'Oct' },
    { value: 10, label: 'Nov' },
    { value: 11, label: 'Dec' },
  ];

  calendarStore: CalendarStore;
  constructor() {
    this.calendarStore = inject(CalendarStore);
    this.month = signal(this.calendarStore.month());
    this.year = signal(this.calendarStore.year());
  }

  dateChanges(date?: Date) {
    const newDate = new Date(date || this.calendarStore.selectedDate());
    newDate.setFullYear(this.year());
    newDate.setMonth(this.month());
    this.calendarStore.setSelectedDate(newDate);
  }
}
