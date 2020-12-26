import { Component, OnInit } from '@angular/core';
import { AppHttpService } from '../../_services/app-http-service.service';

@Component({
  selector: 'app-chapter-info',
  templateUrl: './chapter-info.component.html',
  styleUrls: ['./chapter-info.component.scss']
})
export class ChapterInfoComponent implements OnInit {

  progress; any = {};
  constructor(
    private appHttpService: AppHttpService,
  ) { }

  ngOnInit() {
    this.appHttpService.request('profile/progress', '').subscribe(((response) => {
      this.progress = response;
    }));
  }

}
