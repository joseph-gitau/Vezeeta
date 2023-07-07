import { Component, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css'],
})
export class TypeComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    $('.carousel').carousel();
    $(document).ready(function () {
      // Initialize the Bootstrap Carousel
      $('.card-carousel').carousel({
        interval: false, // Disable automatic sliding
        wrap: true, // Enable infinite scrolling
      });

      // Scroll to the next card
      $('.next-button').click(function () {
        $('.card-carousel').carousel('next');
      });

      // Scroll to the previous card
      $('.prev-button').click(function () {
        $('.card-carousel').carousel('prev');
      });
    });
  }
}
