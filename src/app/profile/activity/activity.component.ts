import { Component, OnInit } from '@angular/core';
import { AppHttpService } from '../../_services/app-http-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  user: any;
  imageUrl = 'https://fliteracy.gainpassivemoney.com/api/profile/pic/thumbnail/null';
  activities: any;
  constructor(private appHttp: AppHttpService) { }

  ngOnInit() {
    const self = this;
    self.appHttp.request('profile/activities', '').subscribe((response) => {
      self.activities = response;
    });

    this.appHttp.request('profile', '').subscribe(((response) => {
      this.user = response.data;
      self.imageUrl = "https://fliteracy.gainpassivemoney.com/api/" + 'profile/pic/thumbnail/' + self.user.profile_img_url;
    }));
  }

}
