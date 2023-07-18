import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;

  constructor(private cookieService: CookieService) {
    // Check if the user is already logged in by examining the cookies
    const sessionid = this.cookieService.get('sessionid');
    // ... Check any other required cookies

    this.loggedIn = !!sessionid;
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  setAuthenticationStatus(status: boolean) {
    this.loggedIn = status;
  }

  getFullname(): string {
    // Get the fullname from the cookies
    const fullname = this.cookieService.get('fullname');
    return fullname;
  }

  // logout method
  logout() {
    this.cookieService.delete('sessionid');
    this.cookieService.delete('fullname');
    this.cookieService.delete('csrftoken');
    this.cookieService.delete('email');
    this.setAuthenticationStatus(false);
    // Redirect to the login page
    window.location.href = '/login';
  }
}
