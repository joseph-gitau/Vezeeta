import { Component, OnInit } from '@angular/core';
import { DefaultService } from 'src/app/services/default.service';
import { Doctor } from '../../../../models/default.model';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class DoctorLoginComponent implements OnInit {
  constructor(
    private defaultService: DefaultService,
    private toast: NgToastService,
    private route: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check if user is already logged in, if so redirect to doctor/set-availability
    if (this.authService.isAuthenticated()) {
      this.route.navigate(['/doctor/set-availability']);
    }
  }

  // Doctor model
  doctor: Doctor = {
    email: '',
    password: '',
  };

  loginDoctor(): void {
    if (!this.isFormValid()) {
      this.toast.error({
        detail: 'Please fill in all the required fields.',
        summary: 'Error',
        duration: 5000,
      });
      return;
    }
    const email = this.doctor.email;
    const password = this.doctor.password;
    if (!email || !email.includes('@')) {
      this.toast.error({
        detail: 'Please enter a valid email address.',
        summary: 'Error',
        duration: 5000,
      });
      return;
    }
    const data = {
      email,
      password,
    };

    this.defaultService.loginDoctor(data).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'Successfully logged in.',
          summary: 'Success',
          duration: 5000,
        });
        setTimeout(() => {
          this.route.navigate(['/doctor/set-availability']);
        }, 5000);
      },
      error: (e: any) => {
        console.log(e);
        this.toast.error({
          detail: 'Error logging in the doctor.',
          summary: 'Invalid Credentials',
          duration: 5000,
        });
      },
    });
  }

  // Check if the form is valid
  isFormValid(): boolean {
    if (this.doctor.email === '' || this.doctor.password === '') {
      return false;
    }
    return true;
  }
}
