import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-doctor-search',
  templateUrl: './doctor-search.component.html',
  styleUrls: ['./doctor-search.component.css'],
})
export class DoctorSearchComponent {
  isSpecialtyMenuOpen = false;
  isCountyMenuOpen = false;
  isCityMenuOpen = false;
  isInsuranceMenuOpen = false;
  selectedSpecialty = 'All Specialties';
  selectedCounty = 'All Counties';
  coCities = ['All Cities'];
  selectedCity = 'All Cities';
  selectedInsurance = 'All Insurances';

  specialties: string[] = [
    'All Specialties',
    'Dermatology (Skin)',
    'Dentistry (Teeth)',
    'Psychiatry (Mental, Emotional or Behavioral Disorders)',
    'Pediatrics and New Born (Child)',
    'Neurology (Brain & Nerves)',
    'Orthopedics (Bones)',
    'Gynaecology and Infertility',
    'Ear, Nose and Throat',
    'Cardiology and Vascular Disease (Heart)',
    'Allergy and Immunology (Sensitivity and Immunity)',
    'Andrology and Male Infertility',
    'Audiology',
    'Cardiology and Thoracic Surgery (Heart & Chest)',
    'Chest and Respiratory',
    'Diabetes and Endocrinology',
    'Diagnostic Radiology (Scan Centers)',
    'Dietitian and Nutrition',
    'Family Medicine',
    'Gastroenterology and Endoscopy',
    'General Practice',
    'General Surgery',
    'Geriatrics (Old People Health)',
    'Hematology',
    'Hepatology (Liver Doctor)',
    'Internal Medicine',
    'IVF and Infertility',
    'Laboratories',
    'Nephrology',
    'Neurosurgery (Brain & Nerves Surgery)',
    'Obesity and Laparoscopic Surgery',
    'Oncology (Tumor)',
    'Oncology Surgery (Tumor Surgery)',
    'Ophthalmology (Eyes)',
    'Optometry (Eyes)',
    'Osteopathy (Oseopathic Medicine)',
    'Pain Management',
    'Pediatric Surgery',
    'Phoniatrics (Speech)',
    'Physiotherapy and Sport Injuries',
    'Plastic Surgery',
    'Rheumatology',
    'Spinal Surgery',
    'Urology (Urinary System)',
    'Vascular Surgery (Arteries and Vein Surgery',
  ];

  counties: string[] = [
    'All Counties',
    'Nairobi',
    'Coast Region',
    'Rift Valley Region',
    'Eastern Region',
    'Central Region',
    'Western Region',
  ];

  cities: { [key: string]: string[] } = {
    'All Counties': ['All Cities'],
    Nairobi: [
      'All Cities',
      'Nairobi City',
      'Westlands',
      'Kasarani',
      'Kibera',
      'Kilimani',
      'Kileleshwa',
      'Karen',
      'Kangemi',
      'Kawangware',
      'Langata',
      'Lavington',
      'Madaraka',
      'Muthaiga',
      'Ngara',
      'Parklands',
      'Rongai',
      'Roysambu',
      'Ruaka',
      'Ruiru',
      'South B',
      'South C',
      'Syokimau',
      'Thika Road',
      'Umoja',
      'Upper Hill',
      'Utawala',
      'Waiyaki Way',
      'Westlands',
      'Zimmerman',
    ],
    'Coast Region': [
      'All Cities',
      'Mombasa',
      'Kilifi',
      'Kwale',
      'Lamu',
      'Tana River',
    ],
    'Rift Valley Region': [
      'All Cities',
      'Nyahururu',
      'Eldoret',
      'Baringo',
      'Nakuru',
      'Naivasha',
      'Narok',
      'Kericho',
    ],
    'Eastern Region': ['All Cities', 'Embu', 'Kitui', 'Meru'],
    'Central Region': ['All Cities', 'Nyeri', 'Muranga', 'Kirinyaga', 'Kiambu'],
    'Western Region': [
      'All Cities',
      'Kakamega',
      'Kisumu',
      'Homabay',
      'Migori',
      'Kisii',
      'Nyamira',
      'Bungoma',
      'Siaya',
      'Webuye',
    ],
  };

  insurances: string[] = [
    'No Insurance',
    'APA Insurance Limited',
    'CIC General Insurance Company Limited',
    'AAR Insurance Company Limited',
    'Madison General Insurance Kenya Limited',
    'Resolution Insurance Company Limited',
    'Saham Assurance Company Kenya Limited',
    'Sanlam General Insurance Company Limited',
    'The Jubilee Insurance Company of Kenya Limited',
    'Pacis Insurance Company Limited',
    'AETNA',
    'AIG Kenya Insurance Co. Ltd',
    'Alexander Forbes Insurance Company Limited',
    'Allianz Insurance Company of Kenya Limited',
    'Aon Kenya Insurance brokers',
    'AON Minet Insurance Brokers',
    'APA insurance',
    'BRIGHAM',
    'BRITAM',
    'Britam insurance',
    'BUPA',
    'CFC LIFE',
    'CFC Life Assurance ',
    'Cigna',
    'Clarkson Notcutt Insurance',
    'East Africa Reinsurance Company Limited',
    'Fidelity Shield Insurance Company Limited',
    'First Assurance Company Limited',
    'GA Insurance Limited',
    'Geminia Insurance Company Limited',
    'General accident',
    'ICEA LION General Insurance Company Limited',
    'JWS Worldwide Health Plan',
    'KCB',
    'KENBRIGHT',
    'Kenindia Assurance Company Limited',
    'Kenya Orient Insurance Limited',
    'Kenya Reinsurance Corporation Limited',
    'KPA',
    'KPLC',
    'Liaison Group',
    'Metropolitan Cannon General Insurance Company Limited',
    'NAIROBI WATER',
    'NHIF',
    'Pioneer Assurance Company',
    'PIONEER INSURANCE',
    'Resolution Health',
    'Takaful Insurance of Africa Limited',
    'Tausi Assurance Company Limited',
    'The Heritage Insurance Company Limited',
    'The Kenyan Alliance Insurance Company Limited',
    'The Monarch Insurance Company Limited',
    'Trident Insurance Company Limited',
    'UAP Insurance Company Limited',
    'Xplico Insurance Company Limited',
  ];

  selectSpecialty(specialty: string) {
    this.selectedSpecialty = specialty;
    console.log('Selected Specialty:', specialty);
  }

  selectCounty(county: string) {
    this.selectedCounty = county;
    console.log('Selected County:', county);
    // Populate cities based on selected county
    this.coCities = this.cities[county];
    // Reset selected city to 'All Cities' when county changes
    this.selectedCity = 'All Cities';
  }

  selectCity(city: string) {
    this.selectedCity = city;
    console.log('Selected City:', city);
  }

  selectInsurance(insurance: string) {
    this.selectedInsurance = insurance;
    console.log('Selected Insurance:', insurance);
  }

  search() {
    console.log('Perform search');
  }

  onSpecialtyMenuOpened() {
    this.isSpecialtyMenuOpen = true;
  }

  onSpecialtyMenuClosed() {
    this.isSpecialtyMenuOpen = false;
  }

  onCountyMenuOpened() {
    this.isCountyMenuOpen = true;
  }

  onCountyMenuClosed() {
    this.isCountyMenuOpen = false;
  }

  onCityMenuOpened() {
    this.isCityMenuOpen = true;
  }

  onCityMenuClosed() {
    this.isCityMenuOpen = false;
  }

  onInsuranceMenuOpened() {
    this.isInsuranceMenuOpen = true;
  }

  onInsuranceMenuClosed() {
    this.isInsuranceMenuOpen = false;
  }
}
