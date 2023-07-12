import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/default.model';

const baseUrl = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'root',
})
export class DefaultService {
  constructor(private http: HttpClient) {}

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
    const csrfToken = this.getCookie('csrftoken');

    // Set the CSRF token in the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    });

    return this.http.post(baseUrl + 'Patient/login', data, {
      headers: headers,
    });
  }

  // createDoctor
  createDoctor(data: any): Observable<any> {
    // Retrieve the CSRF token from the cookie
    const csrfToken = this.getCookie('csrftoken');

    // Set the CSRF token in the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    });
    console.log(data);

    return this.http.post(baseUrl + 'Doctor/add', data, { headers: headers });
  }
}
