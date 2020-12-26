import { Component, OnInit } from '@angular/core';
import { SliderService } from '../_services/slider.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isDisplayArrow = false;
  isShowingAd = true;
  constructor() {
    $(document).ready(() => {
      setTimeout(() => {
        $('#loader').removeClass('d-flex');
        $('#loader').hide();
      }, 3500);
    });
  }

  ngOnInit() {
    setInterval(() => {
      let scrollPos: any;
      scrollPos = $(window).scrollTop();
      if (scrollPos === 0) {
        this.isDisplayArrow = false;
      } else {
        this.isDisplayArrow = true;
      }
    }, 10);
  }

  close() {
    this.isShowingAd = false;
  }

  scrollToTop() {
    $('html, body').animate({ scrollTop: 0 }, 1500);
  }
}
