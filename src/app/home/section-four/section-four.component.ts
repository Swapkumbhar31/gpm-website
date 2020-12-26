import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppHttpService } from '../../_services/app-http-service.service';

@Component({
  selector: 'app-section-four',
  templateUrl: './section-four.component.html',
  styleUrls: ['./section-four.component.scss']
})
export class SectionFourComponent implements OnInit {
  public contactUsForm: FormGroup;
  public isError;
  public isSuccess;
  constructor(private appHttp: AppHttpService) { }

  ngOnInit() {
    this.contactUsForm = new FormGroup({
      name: new FormControl('',
        [
          Validators.required,
        ]),
      email: new FormControl('',
        [
          Validators.required,
          Validators.email,
        ]),
      message: new FormControl('',
        [
          Validators.required,
        ]),
    });
  }

  onSubmit() {
    if (this.contactUsForm.valid) {
      const self = this;
      let reqData = this.contactUsForm.value;
      self.appHttp.request('contact-us/mail', JSON.stringify(reqData)).subscribe((response) => {
        console.log(response);
        if (response.status === '0') {
          this.isError = 'Error Occured';
        } else if (response.status === '200') {
          this.isSuccess = 'Mail Sent Successfully';
          this.contactUsForm.reset();
        }
        setTimeout(() => {
          this.isError = '';
          this.isSuccess = '';
        }, 3000);
      });
    } else {
      this.isError = 'All fields are required';
      setTimeout(() => {
        this.isError = '';
        this.isSuccess = '';
      }, 1500);
    }

  }
}
