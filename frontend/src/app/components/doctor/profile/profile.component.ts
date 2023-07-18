import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class DoctorProfileComponent implements OnInit {
  signupForm!: FormGroup;
  profilePicturePreview: string | undefined;
  practiceLicensePreview: string | undefined;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile_number: ['', Validators.required],
      specialty: ['', Validators.required],
      license_number: ['', Validators.required],
      affiliation: [''],
      experience: [''],
      education: [''],
      language_proficiency: ['', Validators.required],
      professional_certifications: [''],
      profile_picture: [null],
      practice_license: [null],
    });
  }

  onProfilePictureChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.signupForm.patchValue({ profile_picture: file });
      this.signupForm.get('profile_picture')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicturePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onPracticeLicenseChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.signupForm.patchValue({ practice_license: file });
      this.signupForm.get('practice_license')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.practiceLicensePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile(): void {
    if (!this.signupForm.valid) {
      // Handle form validation errors
      return;
    }

    // Retrieve form values
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
    formData.append('profile_picture', this.signupForm.value.profile_picture);
    formData.append('practice_license', this.signupForm.value.practice_license);

    // Send the form data to the server for profile update
    // Make an HTTP request or call a service to update the profile
    // ...
  }
}
