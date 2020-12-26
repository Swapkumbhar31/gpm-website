import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppHttpService } from '../_services/app-http-service.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotpasswordForm;
  public otpVerifyForm;
  public setPasswordForm;
  public isError;
  public currentStep = 1;

  constructor(private appHttp: AppHttpService, public router: Router) {
    this.forgotpasswordForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          Validators.email,
        ])
    });
    this.otpVerifyForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          Validators.email,
        ]),
      otp: new FormControl('',
        [
          Validators.required,
        ])
    });
    this.setPasswordForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          Validators.email,
        ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
        ]),
      cpassword: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6)
        ]),
    });
  }

  ngOnInit() {

  }

  passwordValidation(event) {
    this.isError = '';
    const self = this;
    this.setPasswordForm.controls.email.setValue(this.forgotpasswordForm.controls.email.value);
    let reqData = this.setPasswordForm.value;
    self.appHttp.request('forgot-password/set-password', JSON.stringify(reqData)).subscribe((response) => {
      if (response.status === '100' || response.status === '0') {
        this.isError = response.msg;
      } if (response.status === '200') {
        this.currentStep = 4;
      }
    }, err => { },
      () => {
        if (!this.isError) {
          /*           this.router.navigate(['/']); */
        }
      });
  }

  otpValidation() {
    this.isError = '';
    const self = this;
    this.otpVerifyForm.controls.email.setValue(this.forgotpasswordForm.controls.email.value);
    let reqData = this.otpVerifyForm.value;
    self.appHttp.request('forgot-password/verify', JSON.stringify(reqData)).subscribe((response) => {
      if (response.status === '100') {
        this.isError = 'OTP Is Not Matched';
      } else if(response.status === '0') {
        this.isError = response.msg;
      } else {
        this.currentStep = 3;
      }
    }, err => { },
      () => {
        
      });
  }

  mailValidation() {
    this.isError = '';
    const self = this;
    let reqData = this.forgotpasswordForm.value;
    self.appHttp.request('forgot-password/mail', JSON.stringify(reqData)).subscribe((response) => {
      console.log(response);
      if (response.status === '0') {
        this.isError = response.msg;
      }
    }, err => { },
      () => {
        if (!this.isError) {
          this.currentStep = 2;
        }
      });
  }
  navigateReister() {
    this.router.navigate(['/']);
  }
}
