import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TypeComponent } from './components/cards/type/type.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
// Angular material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoctorSidebarComponent } from './components/doctor/doctor-sidebar/doctor-sidebar.component';
import { DoctorNavComponent } from './components/doctor/doctor-nav/doctor-nav.component';
import { NavbarComponent } from './components/layouts/navbar/navbar.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { DoctorLayoutComponent } from './components/doctor/layouts/doctor-layout/doctor-layout.component';
import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { DoctorSearchComponent } from './components/doctor-search/doctor-search.component';
// Material modules
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// matDatepicker
import { MatDatepickerModule } from '@angular/material/datepicker';
// mat-checkbox
import { MatCheckboxModule } from '@angular/material/checkbox';
// MatNativeDateModule
import { MatNativeDateModule } from '@angular/material/core';
// mat-option
import { MatOptionModule } from '@angular/material/core';
import { NgToastModule } from 'ng-angular-popup';
import { GetStartedComponent } from './components/doctor/get-started/get-started.component';
import { DoctorSignupComponent } from './components/doctor/auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SetAvailabilityComponent } from './components/doctor/set-availability/set-availability.component';
import { DoctorLoginComponent } from './components/doctor/auth/login/login.component';
import { DoctorProfileComponent } from './components/doctor/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DoctorComponent,
    TypeComponent,
    ContactComponent,
    SignupComponent,
    LoginComponent,
    DoctorSidebarComponent,
    DoctorNavComponent,
    NavbarComponent,
    FooterComponent,
    DoctorLayoutComponent,
    DefaultLayoutComponent,
    DoctorSearchComponent,
    GetStartedComponent,
    DoctorSignupComponent,
    DoctorLoginComponent,
    SetAvailabilityComponent,
    DoctorProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Import HttpClientModule after BrowserModule.
    FormsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    NgToastModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
