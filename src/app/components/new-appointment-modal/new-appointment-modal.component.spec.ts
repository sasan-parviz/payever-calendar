import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppointmentModalComponent } from './new-appointment-modal.component';

describe('NewAppointmentModalComponent', () => {
  let component: NewAppointmentModalComponent;
  let fixture: ComponentFixture<NewAppointmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAppointmentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
