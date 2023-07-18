import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

// const baseUrl = 'https://5834-102-68-77-227.ngrok-free.app/api/';
const baseUrl = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'root',
})
export class DefaultService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  // Create a new patient
  create(data: any): Observable<any> {
    // Retrieve the CSRF token from the cookie
    const csrfToken = this.getCookie('csrftoken');

    // Set the CSRF token in the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    });
    console.log(data);

    return this.http.post(baseUrl + 'Patient/add', data, { headers: headers });
  }

  // Function to extract the CSRF token from the cookie
  private getCookie(name: string): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()!.split(';').shift()!;
    }
    return '';
  }

  // Login a patient
  login(data: any): Observable<any> {
    // Retrieve the CSRF token from the cookie
    const csrfToken = this.cookieService.get('csrftoken');

    // Set the CSRF token in the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    });

    return this.http
      .post(baseUrl + 'Patient/login', data, {
        headers: headers,
        withCredentials: true,
      })
      .pipe(
        tap((response: any) => {
          console.log(response);

          const sessionid = this.cookieService.get('sessionid');
          const csrftoken = this.cookieService.get('csrftoken');
          // get email and name from response
          const email = response['email'];
          const fullname = response['name'];

          // Set the cookies with the correct variables
          this.cookieService.set('sessionid', sessionid);
          this.cookieService.set('csrftoken', csrftoken);
          this.cookieService.set('email', email);
          this.cookieService.set('fullname', fullname);

          // Set the authentication status
          this.authService.setAuthenticationStatus(true);
        })
      );
  }

  // createDoctor
  createDoctor(data: any): Observable<any> {
    const headers = new HttpHeaders();

    return this.http.post(baseUrl + 'Doctor/add', data, { headers });
  }

  // Login a doctor
  loginDoctor(data: any): Observable<any> {
    // Retrieve the CSRF token from the cookie
    const csrfToken = this.cookieService.get('csrftoken');

    // Set the CSRF token in the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    });

    return this.http
      .post(baseUrl + 'Doctor/login', data, {
        headers: headers,
        withCredentials: true,
      })
      .pipe(
        tap((response: any) => {
          console.log(response);

          const sessionid = this.cookieService.get('sessionid');
          const csrftoken = this.cookieService.get('csrftoken');
          // get email and name from response
          const email = response['email'];
          const fullname = response['name'];

          // Set the cookies with the correct variables
          this.cookieService.set('sessionid', sessionid);
          this.cookieService.set('csrftoken', csrftoken);
          this.cookieService.set('email', email);
          this.cookieService.set('fullname', fullname);

          // Set the authentication status
          this.authService.setAuthenticationStatus(true);
        })
      );
  }
}
