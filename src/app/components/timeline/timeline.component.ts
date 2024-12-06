import { Component, computed, Signal, signal } from '@angular/core';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { IAppointment, TimeLine } from '../../shared/interfaces';
import { AppointmentsStore, CalendarStore } from '../../store';
import { TimeDoubleDigitPipe, DateTimeFormatterPipe } from '../../shared/pipes';

@Component({
  selector: 'app-timeline',
  imports: [
    CdkDrag,
    MatButtonModule,
    MatIconModule,
    TimeDoubleDigitPipe,
    DateTimeFormatterPipe,
  ],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent {
  constructor(
    private calendarStore: CalendarStore,
    private appointmentsStore: AppointmentsStore
  ) {}
  timelineTemplate: TimeLine[] = [];

  generateTimelines(): void {
    this.timelineTemplate = [];
    const startOfDay = new Date(this.calendarStore.selectedDate());
    startOfDay.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setDate(this.calendarStore.selectedDate().getDate() + 1);
    while (startOfDay.getDate() < tomorrow.getDate()) {
      this.timelineTemplate.push({
        hour: startOfDay.getHours(),
        minutes: 0,
        label: `${startOfDay.getHours()}:00`,
      });
      this.timelineTemplate.push({
        hour: startOfDay.getHours(),
        minutes: 30,
        label: `${startOfDay.getHours()}:30`,
      });
      startOfDay.setHours(startOfDay.getHours() + 1);
    }
  }

  appointments = signal<Record<string, IAppointment[]>>({});
  appointmentsTemplate: Signal<IAppointment[]> = computed(() => {
    const date = this.calendarStore.selectedDate();
    const dateKey = `${date.getFullYear()}-${(
      '0' +
      (date.getMonth() + 1)
    ).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    return this.appointments()[dateKey] || [];
  });

  ngOnInit(): void {
    this.generateTimelines();

    this.appointmentsStore.appointments$.subscribe((appointments) => {
      this.appointments.set(appointments);
    });
  }

  dragEnd($event: CdkDragEnd, appointmentId: string) {
    const appointments = this.appointmentsTemplate();
    const selectedDate = this.calendarStore.selectedDate();
    const selectedDateValue = `${selectedDate.getFullYear()}-${(
      '0' + selectedDate.getMonth()
    ).slice(-2)}-${('0' + selectedDate.getDate()).slice(-2)}`;
    const newPosition = $event.source.getFreeDragPosition();
    const apint = appointments.find((i) => i.id === appointmentId);
    if (apint) {
      apint.position = newPosition;
      const startHour = Math.floor(newPosition.y / 40 / 2);
      const startMinutes = ((newPosition.y / 40) % 2) * 30;
      apint.startDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        startHour,
        startMinutes,
        0
      );
      const endDate = new Date(apint.startDate);
      endDate.setMinutes(apint.startDate.getMinutes() + apint.duration);
      apint.endDate = endDate;
    }
    this.appointmentsStore.setAppointments(selectedDateValue, appointments);
  }

  onAppointmentDelete(appointmentId: string): void {
    const selectedDate = this.calendarStore.selectedDate();
    const selectedDateValue = `${selectedDate.getFullYear()}-${(
      '0' + selectedDate.getMonth()
    ).slice(-2)}-${('0' + selectedDate.getDate()).slice(-2)}`;
    this.appointmentsStore.removeAppointment(selectedDateValue, appointmentId);
  }
}
