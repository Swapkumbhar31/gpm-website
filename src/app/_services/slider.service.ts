import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class SliderService {
  currentSlide = 0;
  private isStop = true;
  i = 0;
  private interval;
  constructor() { }

  public stop() {
    if (!this.isStop) {
      clearInterval(this.interval);
      this.isStop = true;
    }
  }

  public isStopped() {
    return this.isStop;
  }

  public start() {
    if (this.isStop) {
      this.isStop = false;
      setTimeout(() => {
        for (var x = 0; x < 5; x++) {
          if (x === this.currentSlide) {
            $('.slide' + x).show();
          } else {
            $('.slide' + x).hide();
          }
        }
      }, 10);
      this.interval = setInterval(() => {
        if (window.location.pathname === '/') {
          for (var x = 0; x < 5; x++) {
            if (x === this.currentSlide) {
              $('.slide' + x).show();
            } else {
              $('.slide' + x).hide();
            }
          }
          this.currentSlide = (this.currentSlide + 1) % 5;
        }
      }, 3500);
    }
  }
}
