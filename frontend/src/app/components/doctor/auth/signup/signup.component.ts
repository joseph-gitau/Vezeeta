import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../../../../models/default.model';
import { DefaultService } from '../../../../services/default.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class DoctorSignupComponent implements OnInit {
  signupForm!: FormGroup;
  doctor: Doctor = {
    full_name: '',
    email: '',
    password: '',
    mobile_number: '',
    specialty: '',
    license_number: '',
    affiliation: '',
    experience: '',
    education: '',
    language_proficiency: '',
    professional_certifications: '',
    profile_picture: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private defaultService: DefaultService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile_number: ['', Validators.required],
      specialty: ['', Validators.required],
      license_number: ['', Validators.required],
      affiliation: ['', Validators.required],
      experience: ['', Validators.required],
      education: ['', Validators.required],
      language_proficiency: ['', Validators.required],
      professional_certifications: ['', Validators.required],
      // profile_picture: [null, Validators.required],
    });
  }

  // Create a new doctor
  addNewDoctor(): void {
    if (!this.signupForm.valid) {
      this.toast.error({
        detail: 'Please fill in all the required fields.',
        summary: 'Error',
        duration: 5000,
      });
      return;
    }

    const formData = new FormData();
    formData.append('full_name', this.signupForm.value.full_name);
    formData.append('email', this.signupForm.value.email);
    formData.append('password', this.signupForm.value.password);
    formData.append('mobile_number', this.signupForm.value.mobile_number);
    formData.append('specialty', this.signupForm.value.specialty);
    formData.append('license_number', this.signupForm.value.license_number);
    formData.append('affiliation', this.signupForm.value.affiliation);
    formData.append('experience', this.signupForm.value.experience);
    formData.append('education', this.signupForm.value.education);
    formData.append(
      'language_proficiency',
      this.signupForm.value.language_proficiency
    );
    formData.append(
      'professional_certifications',
      this.signupForm.value.professional_certifications
    );
    // formData.append('profile_picture', this.signupForm.value.profile_picture);

    this.defaultService.createDoctor(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.toast.success({
          detail: 'Doctor created successfully!',
          summary: 'Success',
          duration: 5000,
        });
        // Redirect to the Login page/Component after 5 seconds
        setTimeout(() => {
          window.location.href = '/doctor/login';
        }, 5000);
      },
      error: (e) => {
        console.log(e);
        const errorObject = e.error;
        const errorKeys = Object.keys(errorObject);
        const errorValues = Object.values(errorObject);
        for (let i = 0; i < errorKeys.length; i++) {
          const key = errorKeys[i];
          const element = errorObject[key];
          this.toast.error({
            detail: `Error!: ${key}`,
            summary: `${element}`,
            duration: 5000,
          });
        }
      },
    });
  }
}
