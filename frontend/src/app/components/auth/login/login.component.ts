import { Component, OnInit } from '@angular/core';
import { DefaultService } from 'src/app/services/default.service';
import { Patient } from '../../../models/default.model';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // loginPatient
  constructor(
    private defaultService: DefaultService,
    private toast: NgToastService,
    private route: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    // Check if user is already logged in, if so redirect to home page
    if (this.authService.isAuthenticated()) {
      this.route.navigate(['/home']);
    }

    // Test
    const error_test = [
      {
        headers: {
          normalizedNames: {},
          lazyUpdate: null,
        },
        status: 400,
        statusText: 'Bad Request',
        url: 'http://127.0.0.1:8000/api/Patient/add',
        ok: false,
        name: 'HttpErrorResponse',
        message:
          'Http failure response for http://127.0.0.1:8000/api/Patient/add: 400 Bad Request',
        error: {
          email: ['patient with this email already exists.'],
          email2: ['patient with this email already exists.'],
          email3: ['patient with this email already exists.'],
        },
      },
    ];

    this.displayErrors(error_test);
  }

  // Loop through the error_test array and display each error with name and message
  displayErrors(errors: any[]): void {
    errors.forEach((error) => {
      this.displayErrorMessages(error);
    });
  }

  // Loop through the error object and display the error messages
  displayErrorMessages(error: any): void {
    const errorObject = error.error;
    for (const key in errorObject) {
      if (errorObject.hasOwnProperty(key)) {
        const element = errorObject[key];
        this.toast.error({
          detail: `Error Name: ${key}, Message: ${element[0]}`,
          summary: 'Error',
          duration: 5000,
        });
      }
    }
  }

  patient: Patient = {
    fullname: '',
    mobile: '',
    email: '',
    gender: '',
    BirthDate: new Date(),
    Password: '',
  };

  loginPatient(): void {
    if (!this.isFormValid()) {
      this.toast.error({
        detail: 'Please fill in all the required fields.',
        summary: 'Error',
        duration: 5000,
      });
      return;
    }
    // Verify the patient's credentials
    const email = this.patient.email;
    const password = this.patient.Password;
    // check if the email is a valid email address
    if (!email || !email.includes('@')) {
      this.toast.error({
        detail: 'Please enter a valid email address.',
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
          this.route.navigate(['/home']);
        }, 5000);
      },
      error: (e) => {
        console.log(e);
        this.toast.error({
          detail: 'Error logging in the patient.',
          summary: 'Invalid Credentials',
          duration: 5000,
        });
      },
    });
  }

  // Check if the form is valid
  isFormValid(): boolean {
    return !!(this.patient.email && this.patient.Password);
  }
}
