import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  getUsername(): string {
    // Get the fullname from the cookies
    const fullname = this.authService.getFullname();
    return fullname;
  }

  logout() {
    this.authService.setAuthenticationStatus(false);
  }
}
