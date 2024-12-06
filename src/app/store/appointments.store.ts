import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAppointment } from '../shared/interfaces/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentsStore {
  private appointments = new BehaviorSubject<Record<string, IAppointment[]>>({
    '2024-12-06': [
      {
        id: '123123-123123-v3123-dhaskd',
        title: 'Appointment 1',
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          0,
          0,
          0
        ),
        duration: 60, // minutes
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          1,
          0,
          0
        ),
        position: { x: 0, y: 0 },
      },
      {
        id: '12adsx-2m28vj123-vk123oik13',
        title: 'Appointment 2',
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          1,
          30,
          0
        ),
        duration: 30, // minutes
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          2,
          0,
          0
        ),
        position: { x: 0, y: 120 },
      },
      {
        id: '12adsx-2m28vj123-vk23z2313',
        title: 'Appointment 3',
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          3,
          0,
          0
        ),
        duration: 120, // minutes
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          5,
          0,
          0
        ),
        position: { x: 0, y: 240 },
      },
    ],
  });
  appointments$ = this.appointments.asObservable();

  getAppointments(): Record<string, IAppointment[]> {
    return this.appointments.value;
  }

  setAppointments(date: string, appointments: IAppointment[]) {
    this.appointments.next({
      ...this.appointments.value,
      [date]: appointments,
    });
  }

  addAppointment(date: string, appointment: IAppointment) {
    const currentAppointments = this.appointments.value[date] || [];
    currentAppointments.push(appointment);
    this.appointments.next({
      ...this.appointments.value,
      [date]: currentAppointments,
    });
  }

  removeAppointment(date: string, appointmentId: string) {
    const otherAppointments = this.appointments.value[date].filter(
      (i) => i.id !== appointmentId
    );
    this.appointments.next({
      ...this.appointments.value,
      [date]: otherAppointments,
    });
  }
}
