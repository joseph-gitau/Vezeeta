import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultService } from 'src/app/services/default.service';
import { CookieService } from 'ngx-cookie-service';

declare var FileReader: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class DoctorProfileComponent implements OnInit {
  updateProfileForm!: FormGroup;
  profilePicturePreview: string | ArrayBuffer | null = null;
  practiceLicensePreview: string | ArrayBuffer | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private defaultService: DefaultService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.updateProfileForm = this.formBuilder.group({
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

    // Retrieve the profile data from the backend

    // and update the form values
    this.fetchDoctorProfile();
    // If the profile picture is not null, set the preview
    if (this.updateProfileForm.value.profile_picture !== null) {
      this.profilePicturePreview = this.updateProfileForm.value.profile_picture;
    }
    // If the practice license is not null, set the preview
    if (this.updateProfileForm.value.practice_license !== null) {
      this.practiceLicensePreview =
        this.updateProfileForm.value.practice_license;
    }
  }
  fetchDoctorProfile(): void {
    // Get logged user email from cookies
    const email = this.cookieService.get('email');
    console.log(email);
    // Make an HTTP request or call a service to fetch the profile data
    this.defaultService.getDoctorProfile(email).subscribe({
      next: (res) => {
        // console.log(res);
        this.updateProfileForm.patchValue({
          full_name: res.full_name,
          email: res.email,
          // password: res.password,
          mobile_number: res.mobile_number,
          specialty: res.specialty,
          license_number: res.license_number,
          affiliation: res.affiliation,
          experience: res.experience,
          education: res.education,
          language_proficiency: res.language_proficiency,
          professional_certifications: res.professional_certifications,
          profile_picture: res.profile_picture,
          practice_license: res.practice_license,
        });
        this.profilePicturePreview = res.profile_picture;
        this.practiceLicensePreview = res.practice_license;
      },
    });
  }

  onProfilePictureChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.profilePicturePreview = event.target.result;
      };
    }
  }

  onPracticeLicenseChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.practiceLicensePreview = event.target.result;
      };
    }
  }

  updateProfile(): void {
    // Retrieve form values
    const formData = new FormData();
    formData.append('full_name', this.updateProfileForm.value.full_name);
    formData.append('email', this.updateProfileForm.value.email);
    formData.append(
      'mobile_number',
      this.updateProfileForm.value.mobile_number
    );
    formData.append('specialty', this.updateProfileForm.value.specialty);
    formData.append(
      'license_number',
      this.updateProfileForm.value.license_number
    );
    formData.append('affiliation', this.updateProfileForm.value.affiliation);
    formData.append('experience', this.updateProfileForm.value.experience);
    formData.append('education', this.updateProfileForm.value.education);
    formData.append(
      'language_proficiency',
      this.updateProfileForm.value.language_proficiency
    );
    formData.append(
      'professional_certifications',
      this.updateProfileForm.value.professional_certifications
    );

    // Get the File objects from the file inputs
    const profilePictureControl = this.updateProfileForm.get('profile_picture');
    const practiceLicenseControl =
      this.updateProfileForm.get('practice_license');
    const profilePicture = profilePictureControl
      ? profilePictureControl.value
      : null;
    const practiceLicense = practiceLicenseControl
      ? practiceLicenseControl.value
      : null;

    // Check if a new profile picture is selected
    if (profilePicture instanceof File) {
      formData.append('profile_picture', profilePicture);
    }

    // Check if a new practice license is selected
    if (practiceLicense instanceof File) {
      formData.append('practice_license', practiceLicense);
    }

    console.log(formData);

    // Send the form data to the server for profile update
    this.defaultService.updateDoctorProfile(formData).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });
  }
}
