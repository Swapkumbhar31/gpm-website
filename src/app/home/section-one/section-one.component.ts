import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SliderService } from 'src/app/_services/slider.service';
declare var $: any;
@Component({
  selector: 'app-section-one',
  templateUrl: './section-one.component.html',
  styleUrls: ['./section-one.component.scss']
})
export class SectionOneComponent implements OnInit, AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    this.slider.stop();
  }

  constructor(private slider: SliderService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.slider.start();
  }
}
