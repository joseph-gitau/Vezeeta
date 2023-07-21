import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-doctor-nav',
  templateUrl: './doctor-nav.component.html',
  styleUrls: ['./doctor-nav.component.css'],
})
export class DoctorNavComponent {
  constructor(private authService: AuthService) {}

  showUserDropdown = false;

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }
  isLoggedIn(): boolean {
    // console.log(this.authService.isAuthenticated());
    return this.authService.isAuthenticated();
  }

  getUsername(): string {
    // Get the fullname from the cookies
    const fullname = this.authService.getFullname();
    // console.log(fullname);
    return fullname;
  }

  logout() {
    this.authService.logout();
  }
}
