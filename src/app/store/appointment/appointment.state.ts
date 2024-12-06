import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { IAppointment } from '../../shared/interfaces';
import {
  AddAppointment,
  RemoveAppointment,
  SetAppointments,
} from './appointment.action';

@State<Record<string, IAppointment[]>>({
  name: 'appointments',
  defaults: {
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
  },
})
@Injectable()
export class AppointmentState {
  @Selector()
  public static getAppointments(state: Record<string, IAppointment[]>) {
    return state;
  }

  @Action(SetAppointments)
  public setAppointments(
    ctx: StateContext<Record<string, IAppointment[]>>,
    { date, appointments }: SetAppointments
  ) {
    const state = ctx.getState();
    return ctx.patchState({ ...state, [date]: appointments });
  }

  @Action(AddAppointment)
  public addAppointment(
    ctx: StateContext<Record<string, IAppointment[]>>,
    { date, appointment }: AddAppointment
  ) {
    const state = ctx.getState();
    const currentAppointments = state[date] || [];
    currentAppointments.push(appointment);
    return ctx.patchState({ ...state, [date]: currentAppointments });
  }

  @Action(RemoveAppointment)
  public removeAppointment(
    ctx: StateContext<Record<string, IAppointment[]>>,
    { date, appointmentId }: RemoveAppointment
  ) {
    const state = ctx.getState();
    const otherAppointments = state[date].filter((i) => i.id !== appointmentId);
    return ctx.patchState({ ...state, [date]: otherAppointments });
  }
}
