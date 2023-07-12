import { Component } from '@angular/core';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css'],
})
export class GetStartedComponent {
  currentPage = 1;

  nextPage() {
    if (this.currentPage < 4) {
      this.currentPage++;
    }
  }
}
