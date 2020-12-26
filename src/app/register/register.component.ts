
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '../../../node_modules/@angular/forms';
import { AppHttpService } from '../_services/app-http-service.service';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { LoginModalService } from '../login-modal/login-modal-service.service';
import { Title } from '@angular/platform-browser';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AuthenticationService } from '../_services/authentication.service';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm;
  public step1;
  public step2;
  public step3;
  public fileName;
  public currentStep = 0;
  public errorText;
  private isReferred = false;
  @ViewChild('fileInput') fileInput;
  public placeholder = 'Choose pan image file';
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  private refferal_code = '';
  constructor(
    private appHttpService: AppHttpService,
    private router: Router,
    public authService: AuthenticationService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/profile'], { relativeTo: this.route });
    }
    this.route.params.subscribe((params) => {
      this.refferal_code = params['code'];
      this.isReferred = true;
    });
    this.step1 = new FormGroup({
      membership: new FormControl('',
        [
          Validators.required,
        ]),
      email: new FormControl('',
        [
          Validators.required,
          Validators.email,
        ]),
      firstname: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z]*')
        ]),
      lastname: new FormControl('',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z]*')
        ]),
      contact: new FormControl('',
        [
          Validators.required,
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
      referral_code: new FormControl({ value: this.refferal_code, disabled: this.isReferred },
        []),
    });
    this.step2 = new FormGroup({
      pancard: new FormControl('',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}')
        ]),
      panfile: new FormControl(this.fileName,
        [
        ]),
      dob: new FormControl('',
        [
          Validators.required,
          Validators.pattern('[1-2]{1}[0-9]{3}\/[0-1]{1}[0-9]{1}\/[0-3]{1}[0-9]{1}')
        ]),
      address: new FormControl('',
        [
          Validators.required,
        ]),
      city: new FormControl('',
        [
          Validators.required,
        ]),
      state: new FormControl('',
        [
          Validators.required,
        ]),
    });
    this.step3 = new FormGroup({
      bankname: new FormControl('',
        [
          Validators.required,
        ]),
      accountnumber: new FormControl('',
        [
          Validators.required,
        ]),
      ifsc: new FormControl('',
        [
          Validators.required,
        ]),
      nameonpassbook: new FormControl('',
        [
          Validators.required,
        ]),
    });
    this.registerForm = new FormGroup({
      step1: this.step1,
      step2: this.step2,
      step3: this.step3,
    });
  }

  onFileChange(event) {
    const self = this;
    let fi = self.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      self.appHttpService
        .multiPartRequest('pancard', fileToUpload, self.step2.controls.panfile.value).subscribe((response) => {
          console.log(response);
          self.step2.controls.panfile.value = response._body;
          self.placeholder = fileToUpload.name;
        });
    }
  }
  ngOnInit() {
    this.titleService.setTitle('Gainpassivemoney.com: Register');
    this.staticTabs.tabs[this.currentStep].active = true;
  }
  register() {
    if ((this.currentStep === 1) || (this.currentStep === 2)) {
      let data = { ...this.step1.value, ...this.step2.value, ...this.step3.value };
      data.panfile = this.fileName;
      this.appHttpService.request('register', JSON.stringify(data)).subscribe((response) => {
        if (response.data) {
          // this.router.navigate(['/mail/verify'], { relativeTo: this.route });
          window.location.href = "https://fliteracy.gainpassivemoney.com/payment/" + response.data.membership + "/" + response.data.referral_code;
        } else if (response.email) {
          this.errorText = response.email[0];
        } else if (response.pancard) {
          this.errorText = response.pancard[0];
        } else {
          this.errorText = 'Error occurred while registering. please try after some time.';
        }
      });

    } else {
      if (!this.step1.controls.membership) {
        this.errorText = 'Please select membership type';
        return;
      }
    }

  }
  nextStep() {
    if (this.step1.status === 'VALID' && this.currentStep === 0 &&
      this.step1.controls.password.value === this.step1.controls.cpassword.value) {
      this.currentStep = this.currentStep + 1 % 3;
      this.errorText = '';
      this.staticTabs.tabs[this.currentStep].active = true;
    } else if (this.step2.status === 'VALID' && this.currentStep === 1) {
      this.currentStep = this.currentStep + 1 % 3;
      this.errorText = '';
      this.staticTabs.tabs[this.currentStep].active = true;
    } else {
      this.scrollToTop();
      this.errorText = 'Please enter all required field.';
      if (this.step1.controls.password.value !== this.step1.controls.cpassword.value) {
        this.errorText = 'Password do not match.';
      } else if (this.step1.controls.firstname.errors && this.step1.controls.firstname.errors.required) {
        this.errorText = 'Please enter First name.';
      } else if (this.step1.controls.lastname.errors && this.step1.controls.lastname.errors.required) {
        this.errorText = 'Please enter Last name.';
      } else if (this.step1.controls.membership.errors && this.step1.controls.membership.errors.required) {
        this.errorText = 'Select membership type.';
      } else if (this.step1.controls.email.errors && this.step1.controls.email.errors.required) {
        this.errorText = 'Please enter email.';
      } else if (this.step1.controls.email.errors && this.step1.controls.email.errors.pattern) {
        this.errorText = 'Please enter valid email.';
      } else if (this.step1.controls.contact.errors && this.step1.controls.contact.errors.required) {
        this.errorText = 'Please enter contact.';
      } else if (this.step1.controls.password.errors && this.step1.controls.password.errors.required) {
        this.errorText = 'Please enter password.';
      } else if (this.step2.controls.pancard.errors && this.step2.controls.pancard.errors.required) {
        this.errorText = 'Please enter pancard.';
      } else if (this.step2.controls.dob.errors && this.step2.controls.dob.errors.required) {
        this.errorText = 'Please enter date of birth.';
      } else if (this.step2.controls.address.errors && this.step2.controls.address.errors.required) {
        this.errorText = 'Please enter address.';
      } else if (this.step2.controls.city.errors && this.step2.controls.city.errors.required) {
        this.errorText = 'Please enter city.';
      } else if (this.step2.controls.state.errors && this.step2.controls.state.errors.required) {
        this.errorText = 'Please enter state.';
      } else if (this.step3.controls.bankname.errors && this.step3.controls.bankname.errors.required) {
        this.errorText = 'Please enter bank name.';
      } else if (this.step3.controls.accountnumber.errors && this.step3.controls.accountnumber.errors.required) {
        this.errorText = 'Please enter account number.';
      } else if (this.step3.controls.ifsc.errors && this.step3.controls.ifsc.errors.required) {
        this.errorText = 'Please enter IFSC.';
      } else if (this.step3.controls.nameonpassbook.errors && this.step3.controls.nameonpassbook.errors.required) {
        this.errorText = 'Please enter name as per passbook.';
      }
    }
  }

  scrollToTop() {
    $('html, body').animate({
      scrollTop: 0
    }, 200);
  }

  pervStep() {
    this.currentStep = this.currentStep - 1 % 3;
    this.staticTabs.tabs[this.currentStep].active = true;
  }

  goToStep(pageNo) {
    this.currentStep = pageNo;
  }


}
