import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppHttpService } from '../../_services/app-http-service.service';

@Component({
  selector: 'app-change-bank-detailes',
  templateUrl: './change-bank-detailes.component.html',
  styleUrls: ['./change-bank-detailes.component.scss']
})
export class ChangeBankDetailesComponent implements OnInit {
  public changeBankDetailsForm;
  public isError;
  public isSuccess;
  @Output() hideModal = new EventEmitter();
  constructor(private http: AppHttpService) {
    this.changeBankDetailsForm = new FormGroup({
      bank_name: new FormControl('',
        [
          Validators.required,
        ]),
      account_number: new FormControl('',
        [
          Validators.required,
        ]),
      ifsc: new FormControl('',
        [
          Validators.required,
        ]),
      name: new FormControl('',
        [
          Validators.required,
        ]),
    });
  }

  ngOnInit() {
    const self = this;
    self.http.request('profile/get/bankdetails', '').subscribe((response) => {
      if (response && response.id) {
        console.log(response);
        this.changeBankDetailsForm.patchValue(response);
      } else {
        this.isError = 'No record found';
      }
    });

  }
  hide() {
    this.hideModal.emit();
  }
  submit() {
    if (this.changeBankDetailsForm.valid) {
      const self = this;
      self.http.request('profile/update/bankdetails', JSON.stringify(self.changeBankDetailsForm.value)).subscribe((response) => {
        if (response.data) {
          this.isSuccess = 'Record updated';
          setTimeout(() => {
            self.hide();
          }, 1000);
        } else {
          this.isError = 'Error whihe updating';
        }
      });
    }
  }
}
