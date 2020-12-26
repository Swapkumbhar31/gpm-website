import { Component, OnInit } from '@angular/core';
import { AppHttpService } from '../_services/app-http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mail-verification',
  templateUrl: './mail-verification.component.html',
  styleUrls: ['./mail-verification.component.scss']
})
export class MailVerificationComponent implements OnInit {

  constructor(
    private appHttpService: AppHttpService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Gainpassivemoney : Mail verification");
    this.appHttpService.request('profile', '').subscribe(((response) => {
      if(response.status === 200) {
        this.router.navigate(['/profile'], { relativeTo: this.route });
      }
    }));
  }

}
