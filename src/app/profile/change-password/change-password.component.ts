import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppHttpService } from '../../_services/app-http-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changepasswordForm: FormGroup;
  public isError;
  public isSuccess;
  @Output() hideModal = new EventEmitter();
  constructor(private http: AppHttpService) {
    this.changepasswordForm = new FormGroup({
      old: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6)
        ]),
      new: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6)
        ]),
      confirm: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6)
        ]),
    });
  }

  ngOnInit() {

  }
  submit() {
    this.isError = null;
    this.isSuccess = null;
    if (this.changepasswordForm.valid) {
      if(this.changepasswordForm.controls.old.value === this.changepasswordForm.controls.new.value) {
        this.isError = "Old password and new passsword cannot be same.";
        return;
      }
      if (this.changepasswordForm.controls.new.value !== this.changepasswordForm.controls.confirm.value) {
        this.isError = "New password does not match with confirm password.";
        return;
      }
      const self = this;
      self.http.request('profile/update/password', JSON.stringify(self.changepasswordForm.value)).subscribe((response) => {
        if (response. status === 0) {
          self.isError = response.msg;
        } else {
          self.isSuccess = response.msg;
          setTimeout(() => {
            self.hide();
          }, 500);
        }
      });
    }
  }

  hide() {
    this.hideModal.emit();
  }

}
