import { Component, OnInit } from '@angular/core';
import { AppHttpService } from '../_services/app-http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register-payment',
  templateUrl: './register-payment.component.html',
  styleUrls: ['./register-payment.component.scss']
})
export class RegisterPaymentComponent implements OnInit {

  constructor(
    private appHttpService: AppHttpService,
    private router: Router,
    public authService: AuthenticationService,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Gainpassivemoney : Checkout');
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/profile'], { relativeTo: this.route });
    }
    this.route.params.subscribe((params) => {
      localStorage.setItem('reffreal_code', params['code']);
      console.log(params['code']);
    });
  }

}
