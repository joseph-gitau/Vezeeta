import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

interface Shift {
  startTime: string;
  endTime: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-set-availability',
  templateUrl: './set-availability.component.html',
  styleUrls: ['./set-availability.component.css'],
})
export class SetAvailabilityComponent {
  days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  shifts: { [key: string]: Shift[] } = {};
  newShift: Shift = { startTime: '', endTime: '', isSelected: false };

  constructor(private toast: NgToastService) {
    this.initShifts();
  }

  initShifts(): void {
    for (const day of this.days) {
      this.shifts[day] = [];
    }
  }

  isDayShiftsEmpty(day: string): boolean {
    return this.shifts[day].length === 0;
  }

  addShift(day: string): void {
    if (this.isShiftValid(day, this.newShift)) {
      this.newShift.isSelected = true;
      this.shifts[day].push(this.newShift);
      this.newShift = { startTime: '', endTime: '', isSelected: false };
    }
  }

  removeShift(day: string, shift: Shift): void {
    this.shifts[day] = this.shifts[day].filter((s) => s !== shift);
  }

  getDayShifts(day: string): Shift[] {
    return this.shifts[day];
  }

  isShiftValid(day: string, shift: Shift): boolean {
    const startTime = this.timeStringToMinutes(shift.startTime);
    const endTime = this.timeStringToMinutes(shift.endTime);

    if (startTime >= endTime) {
      console.log(
        'Invalid time range: End time should be greater than start time'
      );
      this.toast.error({
        detail: 'End time should be greater than start time',
        summary: 'Error',
        duration: 5000,
      });
      return false;
    }

    const existingShifts = this.shifts[day];
    for (const existingShift of existingShifts) {
      const existingStartTime = this.timeStringToMinutes(
        existingShift.startTime
      );
      const existingEndTime = this.timeStringToMinutes(existingShift.endTime);

      if (
        (startTime >= existingStartTime && startTime < existingEndTime) ||
        (endTime > existingStartTime && endTime <= existingEndTime) ||
        (startTime <= existingStartTime && endTime >= existingEndTime)
      ) {
        console.log('Invalid time range: Overlapping with an existing shift');
        this.toast.error({
          detail: 'Overlapping with an existing shift',
          summary: 'Error',
          duration: 5000,
        });
        return false;
      }
    }

    return true;
  }

  timeStringToMinutes(time: string): number {
    const [hours, minutes] = time.split(':');
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  }
}
