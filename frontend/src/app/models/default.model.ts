// Patient model
export class Patient {
  id?: any;
  fullname?: string;
  mobile?: string;
  email?: string;
  gender?: string;
  BirthDate?: Date;
  Password?: string;
}

// Doctor model
/* class Doctor(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    mobile_number = models.CharField(max_length=100)
    specialty = models.CharField(max_length=100)
    license_number = models.CharField(max_length=100)
    affiliation = models.CharField(max_length=100, blank=True)
    experience = models.CharField(max_length=100, blank=True)
    education = models.TextField(blank=True)
    language_proficiency = models.CharField(max_length=100, blank=True)
    professional_certifications = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='doctor_profiles/', blank=True)

    def __str__(self):
        return self.full_name */
export class Doctor {
  id?: any;
  full_name?: string;
  email?: string;
  password?: string;
  mobile_number?: string;
  specialty?: string;
  license_number?: string;
  affiliation?: string;
  experience?: string;
  education?: string;
  language_proficiency?: string;
  professional_certifications?: string;
  profile_picture?: string;
}
