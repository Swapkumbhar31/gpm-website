import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { LoginModalService } from './login-modal-service.service';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { AppHttpService } from '../_services/app-http-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  public loginForm;
  private _username = '';
  private _password = '';
  public isError;
  public isSuccess;
  public msg;
  @Input('show')
  set show(value) {
    if (value) {
      setTimeout(() => {
        this.modal.show();
      }, 100);

    } else if (this.modalRef) {
      this.modal.hide();
    }
  }

  @ViewChild(ModalDirective) modal: ModalDirective;
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private loginModal: LoginModalService,
    public authService: AuthenticationService,
    public appHttpService: AppHttpService,
    private router: Router,
    private route: ActivatedRoute) {
    this.loginForm = new FormGroup({
      email: new FormControl(this._username,
        [
          Validators.required,
          Validators.email,
        ]),
      password: new FormControl(this._password,
        [
          Validators.required,
        ]),
    });
  }
  config = {
    ignoreBackdropClick: true
  };
  ngOnInit() {
    this.loginForm.reset();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  hide() {
    this.loginModal.hide();
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
              this.modal.hide();
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
