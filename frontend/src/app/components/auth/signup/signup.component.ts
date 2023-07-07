import { Component } from '@angular/core';
import { DefaultService } from '../../../services/default.service';
import { Patient } from '../../../models/default.model';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  patient: Patient = {
    fullname: '',
    mobile: '',
    email: '',
    gender: '',
    BirthDate: new Date(),
    Password: '',
  };

  constructor(
    private defaultService: DefaultService,
    private toast: NgToastService
  ) {}

  // Create a new patient
  addNewPatient(): void {
    if (!this.isFormValid()) {
      this.toast.error({
        detail: 'Please fill in all the required fields.',
        summary: 'Error',
        duration: 5000,
      });
      return;
    }

    const data = {
      fullname: this.patient.fullname,
      mobile: this.patient.mobile,
      email: this.patient.email,
      gender: this.patient.gender,
      Birthdate: this.patient.BirthDate,
      password: this.patient.Password,
    };

    this.defaultService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.toast.success({
          detail: 'Patient created successfully!',
          summary: 'Success',
          duration: 5000,
        });
        // Redirect to the Login page/Component after 5 seconds
        setTimeout(() => {
          window.location.href = '/login';
        });
      },
      error: (e) => {
        console.log(e);
        this.toast.error({
          detail: 'Error! Patient not created!',
          summary: 'Error',
          duration: 5000,
        });
        if (e.error && e.error.error) {
          const errorMessage = e.error.error;
          console.log(`Error: ${errorMessage}`);
          this.toast.error({
            detail: 'Error',
            summary: errorMessage,
            duration: 5000,
          });
        }
      },
    });
  }

  private isFormValid(): boolean {
    return !!(
      this.patient.fullname &&
      this.patient.mobile &&
      this.patient.email &&
      this.patient.gender &&
      this.patient.BirthDate &&
      this.patient.Password
    );
  }
}
