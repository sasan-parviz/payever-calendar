// This models should be importent from a
// global shared package across all front-end and backend projects

import { Point } from '@angular/cdk/drag-drop';

export interface IAppointment {
  id: string;
  title: string;
  startDate: Date;
  duration: number; // seconds
  endDate: Date;
  position: Point;
}
