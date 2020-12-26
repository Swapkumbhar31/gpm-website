import { Component, OnInit } from '@angular/core';
import { AppHttpService } from '../_services/app-http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { States } from '../states';
import { CountryCode } from '../phone-codes';
declare var $: any;

@Component({
  selector: 'app-register-information',
  templateUrl: './register-information.component.html',
  styleUrls: ['./register-information.component.scss']
})
export class RegisterInformationComponent implements OnInit {
  public type: string;
  public register: FormGroup;
  public errorText;
  public countries = [];
  public statesArray;
  public countryCodeArray;
  constructor(
    private appHttpService: AppHttpService,
    private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { relativeTo: this.route });
    }
    this.titleService.setTitle('Gainpassivemoney : Register user');
    this.statesArray = States.states;
    this.countryCodeArray = CountryCode;
    this.register = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z]*')
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z]*')
      ]),
      email: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.email
      ]),
      contact: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      cpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      pancard: new FormControl('',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}')
        ]),
      dob: new FormControl('',
        [
          Validators.required,
          Validators.pattern('[1-2]{1}[0-9]{3}\/[0-1]{1}[0-9]{1}\/[0-3]{1}[0-9]{1}'),
          this.monthValidator
        ]),
      address: new FormControl('',
        [
          Validators.required,
        ]),
      city: new FormControl('',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9]*'),
        ]),
      country: new FormControl('',
        [
          Validators.required,
        ]),
      state: new FormControl('',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9]*'),
        ]),
      bankname: new FormControl(''),
      accountnumber: new FormControl(''),
      ifsc: new FormControl(''),
      nameonpassbook: new FormControl(''),
    });
  }
  monthValidator(control: FormControl) {
    let date = control.value;
    if (date) {
      let month = date.split("/")[1];
      if (month > 12) {
        return {
          month: {
            month: true
          }
        }
      }
    }
    return null;
  }
  ngOnInit() {
    this.appHttpService.request('getmembershiptype', '').subscribe(response => {
      this.type = response['type'];
      this.register.controls.email.setValue(response['email']);
      if (response['isVerified'] === 1) {
        this.router.navigate(['/profile'], { relativeTo: this.route });
      }
      if (this.type === 'core') {
        this.register.controls.bankname.setValidators(Validators.required);
        this.register.controls.accountnumber.setValidators(Validators.required);
        this.register.controls.ifsc.setValidators(Validators.required);
        this.register.controls.nameonpassbook.setValidators(Validators.required);
      }
    });
    this.appHttpService.request('getcountries', '').subscribe(response => {
      this.countries = response;
    });

    console.log(localStorage.getItem('reffreal_code'));
    if (localStorage.getItem('reffreal_code') !== null && localStorage.getItem('reffreal_code') !== undefined && localStorage.getItem('reffreal_code') !== "undefined") {
      const value = { 'referral_code': localStorage.getItem('reffreal_code') };
      this.appHttpService.request('add/reffreal', JSON.stringify(value)).subscribe((response) => {
        localStorage.removeItem('reffreal_code');
      });
    } else {
      const value = { 'referral_code': null };
      this.appHttpService.request('add/reffreal', JSON.stringify(value)).subscribe((response) => { });
    }
  }
  registerForm() {
    this.errorText = null;
    if (this.register.valid) {
      this.appHttpService.request('register/information', JSON.stringify(this.register.getRawValue())).subscribe((response) => {
        this.router.navigate(['/profile'], { relativeTo: this.route });
      });
    } else {
      this.scrollToTop();
      this.errorText = 'Please enter all required field.';
      if (this.register.controls.password.value !== this.register.controls.cpassword.value) {
        this.errorText = 'Password do not match.';
      } else if (this.register.controls.firstname.errors && this.register.controls.firstname.errors.required) {
        this.errorText = 'Please enter First name.';
      } else if (this.register.controls.lastname.errors && this.register.controls.lastname.errors.required) {
        this.errorText = 'Please enter Last name.';
      } else if (this.register.controls.membership.errors && this.register.controls.membership.errors.required) {
        this.errorText = 'Select membership type.';
      } else if (this.register.controls.email.errors && this.register.controls.email.errors.required) {
        this.errorText = 'Please enter email.';
      } else if (this.register.controls.email.errors && this.register.controls.email.errors.pattern) {
        this.errorText = 'Please enter valid email.';
      } else if (this.register.controls.contact.errors && this.register.controls.contact.errors.required) {
        this.errorText = 'Please enter contact.';
      } else if (this.register.controls.password.errors && this.register.controls.password.errors.required) {
        this.errorText = 'Please enter password.';
      } else if (this.register.controls.pancard.errors && this.register.controls.pancard.errors.required) {
        this.errorText = 'Please enter pancard.';
      } else if (this.register.controls.dob.errors && this.register.controls.dob.errors.required) {
        this.errorText = 'Please enter date of birth.';
      } else if (this.register.controls.address.errors && this.register.controls.address.errors.required) {
        this.errorText = 'Please enter address.';
      } else if (this.register.controls.city.errors && this.register.controls.city.errors.required) {
        this.errorText = 'Please enter city.';
      } else if (this.register.controls.city.errors && this.register.controls.city.errors.pattern) {
        this.errorText = 'Please enter valid city.';
      } else if (this.register.controls.state.errors && this.register.controls.state.errors.required) {
        this.errorText = 'Please enter state.';
      } else if (this.register.controls.state.errors && this.register.controls.state.errors.pattern) {
        this.errorText = 'Please enter valid state.';
      } else if (this.register.controls.bankname.errors && this.register.controls.bankname.errors.required) {
        this.errorText = 'Please enter bank name.';
      } else if (this.register.controls.accountnumber.errors && this.register.controls.accountnumber.errors.required) {
        this.errorText = 'Please enter account number.';
      } else if (this.register.controls.ifsc.errors && this.register.controls.ifsc.errors.required) {
        this.errorText = 'Please enter IFSC.';
      } else if (this.register.controls.nameonpassbook.errors && this.register.controls.nameonpassbook.errors.required) {
        this.errorText = 'Please enter name as per passbook.';
      }
    }
  }

  scrollToTop() {
    $('html, body').animate({
      scrollTop: 0
    }, 200);
  }
}
