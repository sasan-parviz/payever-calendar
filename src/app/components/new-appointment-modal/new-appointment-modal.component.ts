import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { v4 as uuidv4 } from 'uuid';

import { AddAppointment, AppointmentState } from '../../store';
import { makeIso } from '../../shared/utils';
import { Store } from '@ngxs/store';
import { lastValueFrom, Observable } from 'rxjs';
import { IAppointment } from '../../shared/interfaces';

@Component({
  selector: 'app-new-appointment-modal',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './new-appointment-modal.component.html',
  styleUrl: './new-appointment-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAppointmentModalComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  allAppointments$: Observable<Record<string, IAppointment[]>>;

  constructor(
    private dialogRef: MatDialogRef<NewAppointmentModalComponent>,
    private store: Store
  ) {
    this.allAppointments$ = this.store.select(AppointmentState.getAppointments);
  }

  endDateValidator(form: FormGroup): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const startTime = form.get('startTime')?.value;
      if (!startTime) {
        return { required: control.value };
      }
      if (new Date(startTime).getTime() >= new Date(control.value).getTime()) {
        return { required: control.value };
      }
      return null;
    };
  }

  appointmentForm = new FormGroup({
    date: new FormControl<Date>(new Date(), Validators.required),
    startTime: new FormControl<Date>(new Date(), Validators.required),
    endTime: new FormControl<Date>(new Date(), Validators.required),
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  ngOnInit(): void {
    this.appointmentForm
      .get('endTime')
      ?.addValidators(this.endDateValidator(this.appointmentForm));
  }

  async onSubmit() {
    const { date, startTime, endTime, title } = this.appointmentForm.value;
    if (!date || !startTime || !endTime || !title) {
      this._snackBar.open('Some fields are empty!', 'Ok');
      return;
    }
    const allAppointments = await lastValueFrom(this.allAppointments$);
    const selectedDateStr = makeIso(date);

    const appointments = allAppointments[selectedDateStr] || [];

    const startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      startTime.getHours(),
      startTime.getMinutes(),
      0
    );
    const endDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      endTime.getHours(),
      endTime.getMinutes(),
      0
    );

    const conflict = appointments.find((i) => {
      return (
        (i.startDate.getTime() <= startDate.getTime() &&
          startDate.getTime() <= i.endDate.getTime()) ||
        (i.startDate.getTime() <= endDate.getTime() &&
          endDate.getTime() <= i.endDate.getTime()) ||
        (startDate.getTime() <= i.startDate.getTime() &&
          i.endDate.getTime() <= endDate.getTime())
      );
    });

    if (conflict) {
      this._snackBar.open(
        "Time choosen has a conflict with other appointment's times!",
        'Ok'
      );
      return;
    }
    const duration = (endDate.getTime() - startDate.getTime()) / 1000 / 60;
    const y = ((startDate.getHours() * 60 + startDate.getMinutes()) / 30) * 40;

    console.log(selectedDateStr);
    console.log({
      id: uuidv4(),
      title,
      startDate,
      endDate,
      duration,
      position: { x: 0, y },
    });

    // Add Ngxs
    this.store.dispatch(
      new AddAppointment(selectedDateStr, {
        id: uuidv4(),
        title,
        startDate,
        endDate,
        duration,
        position: { x: 0, y },
      })
    );

    this.dialogRef.close();
  }
}
