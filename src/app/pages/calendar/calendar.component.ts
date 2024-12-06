import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import {
  NewAppointmentModalComponent,
  CalendarViewComponent,
  TimelineComponent,
} from '../../components';

@Component({
  selector: 'app-calendar',
  imports: [MatButtonModule, CalendarViewComponent, TimelineComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  readonly addDialog = inject(MatDialog);
  openAddDialog() {
    this.addDialog.open(NewAppointmentModalComponent);
  }
}
