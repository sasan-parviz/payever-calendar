import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { CalendarService } from '../../core/services';
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

  calendarService: CalendarService;
  constructor() {
    this.calendarService = inject(CalendarService);
    this.month = signal(this.calendarService.month());
    this.year = signal(this.calendarService.year());
  }

  dateChanges(date?: Date) {
    const newDate = new Date(date || this.calendarService.selectedDate());
    newDate.setFullYear(this.year());
    newDate.setMonth(this.month());
    this.calendarService.setSelectedDate(newDate);
  }
}
