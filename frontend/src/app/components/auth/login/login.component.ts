import { Component } from '@angular/core';
import { DefaultService } from 'src/app/services/default.service';
import { Patient } from '../../../models/default.model';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  patient: Patient = {
    fullname: '',
    mobile: '',
    email: '',
    gender: '',
    BirthDate: new Date(),
    Password: '',
  };

  // loginPatient
  constructor(
    private defaultService: DefaultService,
    private toast: NgToastService
  ) {}

  loginPatient(): void {
    if (!this.isFormValid()) {
      this.toast.error({
        detail: 'Please fill in all the required fields.',
        summary: 'Error',
        duration: 5000,
      });
      return;
    }

    const data = {
      email: this.patient.email,
      password: this.patient.Password,
    };

    this.defaultService.login(data).subscribe({
      next: (res) => {
        console.log(res);
        this.toast.success({
          detail: 'Patient logged in successfully!',
          summary: 'Success',
          duration: 5000,
        });
        // Redirect to the Login page/Component after 5 seconds
        setTimeout(() => {
          window.location.href = '/login';
        });
      },
    });
  }

  // Check if the form is valid
  isFormValid(): boolean {
    return !!(this.patient.email && this.patient.Password);
  }
}
