import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-doctor-sidebar',
  templateUrl: './doctor-sidebar.component.html',
  styleUrls: ['./doctor-sidebar.component.css'],
})
export class DoctorSidebarComponent {
  sidebarItems: any[] = [
    { name: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    // set availability
    {
      name: 'Set Availability',
      route: '/set-availability',
      icon: 'schedule',
    },
    {
      name: 'Approve Appointments',
      route: '/approve-appointments',
      icon: 'playlist_add_check',
    },

    {
      name: 'Interact with Patients',
      route: '/interact-with-patients',
      icon: 'chat',
    },
    {
      name: 'Prescribe Treatment',
      route: '/prescribe-treatment',
      icon: 'medical_services',
    },
    {
      name: 'Refer Clients to Doctors',
      route: '/refer-clients',
      icon: 'person_add_alt',
    },
    { name: 'Order Lab Results', route: '/order-lab-results', icon: 'science' },
    { name: 'Manage Profile', route: '/manage-profile', icon: 'person' },
    {
      name: 'Leave Platform',
      route: '/leave-platform',
      icon: 'power_settings_new',
    },
    {
      name: 'View Personal Session & Actions',
      route: '/personal-session-actions',
      icon: 'history',
    },
  ];

  showFullItems = true;
  isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  toggleSidebarItems() {
    this.showFullItems = !this.showFullItems;
  }
}
