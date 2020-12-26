import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { AppHttpService } from '../_services/app-http-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm;
  public isError;
  public isSuccess;
  public msg;
  constructor(private router: Router, private route: ActivatedRoute, public appHttpService: AppHttpService, public authService: AuthenticationService) {
    this.loginForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          Validators.email,
        ]),
      password: new FormControl('',
        [
          Validators.required,
        ]),
    });
  }

  ngOnInit() {
  }

  login() {
    const self = this;
    self.isSuccess = null;
    self.isError = null;
    if (self.loginForm.status === 'VALID') {
      this.appHttpService.request('login', JSON.stringify(self.loginForm.value)).subscribe(
        (response: any) => {
          if (response.status === 403) {
            self.isError = true;
            self.msg = 'Access denied';
          } else {
            if (response.status === '200') {
              localStorage.setItem('api_key', response.api_key);
              this.router.navigate(['/profile'], { relativeTo: this.route });
              self.isSuccess = true;
              self.msg = 'Successfully logged in.';
              this.loginForm.reset();
            } else {
              self.isError = true;
              self.msg = 'Username or password is wrong';
            }
          }
        },
        (error) => {
          self.isError = true;
          self.msg = 'Error occurred while logging. please try after some time.';
        }
      );
    }
  }

}
