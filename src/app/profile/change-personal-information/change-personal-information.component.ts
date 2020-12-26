import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppHttpService } from '../../_services/app-http-service.service';

@Component({
  selector: 'app-change-personal-information',
  templateUrl: './change-personal-information.component.html',
  styleUrls: ['./change-personal-information.component.scss']
})
export class ChangePersonalInformationComponent implements OnInit {
  public contactInfoForm: any;
  @Input()
  user: any;
  @Output()
  onUserUpdate: EventEmitter<any> = new EventEmitter<any>();
  public isError;
  public isSuccess;
  public msg;
  @Output() hideModal = new EventEmitter();
  constructor(private http: AppHttpService) { }

  ngOnInit() {
    if (this.user) {
      const dob = new Date(this.user.dob);
      this.contactInfoForm = new FormGroup({
        email: new FormControl(this.user.email, [
          Validators.email,
          Validators.required
        ]),
        dob: new FormControl(dob.getFullYear()+"/"+ ("0" + (dob.getMonth() + 1)).slice(-2)+"/"+("0" + dob.getDate()).slice(-2),
          [
            Validators.required,
            Validators.pattern('[1-2]{1}[0-9]{3}\/[0-1]{1}[0-9]{1}\/[0-3]{1}[0-9]{1}')
          ]),
          contact: new FormControl(this.user.contact, [
            Validators.required
          ]),
          firstname: new FormControl(this.user.name.split(" ")[0], [
            Validators.required,
            Validators.pattern("[a-zA-Z]*"),
          ]),
          lastname: new FormControl(this.user.name.split(" ")[1], [
            Validators.required,
            Validators.pattern("[a-zA-Z]*"),
          ]),
        address: new FormControl(this.user.address, [
          Validators.required
        ]),
        city: new FormControl(this.user.city, [
          Validators.required
        ]),
        state: new FormControl(this.user.state, [
          Validators.required
        ])
      });
    }

  }

  hide() {
    this.hideModal.emit();
  }

  submit() {
    if (this.contactInfoForm.valid) {
      const self = this;
      self.http.request('profile/update/contactInfo', JSON.stringify(self.contactInfoForm.value)).subscribe((response) => {
        if (response.data) {
          this.isSuccess = true;
          this.msg = 'Updated successfully';
          this.onUserUpdate.emit(response.data);
          setTimeout(() => {
            self.hide();
          }, 1000);
        } else {
          this.isError = false;
          this.msg = response.msg;
        }
      });
    }
  }
}
