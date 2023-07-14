import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DoctorSidebarComponent } from './components/doctor/doctor-sidebar/doctor-sidebar.component';
import { DoctorSignupComponent } from './components/doctor/auth/signup/signup.component';
import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { DoctorLayoutComponent } from './components/doctor/layouts/doctor-layout/doctor-layout.component';
import { DoctorHomeComponent } from './components/doctor/home/home.component';
import { DoctorLoginComponent } from './components/doctor/auth/login/login.component';
import { GetStartedComponent } from './components/doctor/get-started/get-started.component';
import { SetAvailabilityComponent } from './components/doctor/set-availability/set-availability.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  { path: 'doctors/get-started', component: GetStartedComponent },
  {
    path: 'doctor',
    component: DoctorLayoutComponent,
    children: [
      {
        path: '',
        component: DoctorComponent,
        children: [
          { path: '', redirectTo: 'doctors/get-started', pathMatch: 'full' },
          { path: 'home', component: DoctorHomeComponent },
          { path: 'signup', component: DoctorSignupComponent },
          { path: 'login', component: DoctorLoginComponent },
          // Add other doctors' section routes here
          { path: 'set-availability', component: SetAvailabilityComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
