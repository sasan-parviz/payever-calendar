import { IAppointment } from '../../shared/interfaces';

export class SetAppointments {
  static readonly type = '[Payever/Appointment] Set All Appointments';
  constructor(public date: string, public appointments: IAppointment[]) {}
}

export class AddAppointment {
  static readonly type = '[Payever/Appointment] Add Appointment';
  constructor(public date: string, public appointment: IAppointment) {}
}

export class RemoveAppointment {
  static readonly type = '[Payever/Appointment] Remove Appointment';
  constructor(public date: string, public appointmentId: string) {}
}
