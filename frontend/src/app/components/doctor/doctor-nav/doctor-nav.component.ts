import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-nav',
  templateUrl: './doctor-nav.component.html',
  styleUrls: ['./doctor-nav.component.css'],
})
export class DoctorNavComponent {
  constructor() {}

  showUserDropdown = false;

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }
}
