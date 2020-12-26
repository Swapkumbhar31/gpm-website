import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SectionOneComponent } from './home/section-one/section-one.component';
import { SectionTwoComponent } from './home/section-two/section-two.component';
import { AppRoutingModule } from '../app/app-routing/app-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { SectionThreeComponent } from './home/section-three/section-three.component';
import { SectionFourComponent } from './home/section-four/section-four.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { AppHttpService } from './_services/app-http-service.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingIndicatorService } from './_services/loading-indicator.service';
import { LoginModalService } from './login-modal/login-modal-service.service';
import { ModalModule } from 'ngx-bootstrap';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsSection1Component } from './about-us/about-us-section1/about-us-section1.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AboutUsSection2Component } from './about-us/about-us-section2/about-us-section2.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { MembershipComponent } from './membership/membership.component';
import { MembershipCoreComponent } from './membership/membership-core/membership-core.component';
import { MembershipBasicComponent } from './membership/membership-basic/membership-basic.component';
import { AuthenticationService } from './_services/authentication.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MailVerificationComponent } from './mail-verification/mail-verification.component';
import { ProfileSmComponent } from './profile/profile-sm/profile-sm.component';
import { ActivityComponent } from './profile/activity/activity.component';
import { ChangeBankDetailesComponent } from './profile/change-bank-detailes/change-bank-detailes.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { ChangePersonalInformationComponent } from './profile/change-personal-information/change-personal-information.component';
import { ChapterInfoComponent } from './profile/chapter-info/chapter-info.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MomentModule } from 'angular2-moment';
import { PaymentComponent } from './payment/payment.component';
import { RegisterPaymentComponent } from './register-payment/register-payment.component';
import { RegisterInformationComponent } from './register-information/register-information.component';
import { LoginComponent } from './login/login.component';
import { PolicyComponent } from './policy/policy.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionOneComponent,
    SectionTwoComponent,
    HomeComponent,
    NavbarComponent,
    SectionThreeComponent,
    SectionFourComponent,
    LoginModalComponent,
    ContactUsComponent,
    AboutUsSection1Component,
    AboutUsComponent,
    AboutUsSection2Component,
    TermsConditionsComponent,
    RefundPolicyComponent,
    MembershipComponent,
    MembershipCoreComponent,
    MembershipBasicComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    ProfileComponent,
    MailVerificationComponent,
    ProfileSmComponent,
    ActivityComponent,
    ChangeBankDetailesComponent,
    ChangePasswordComponent,
    ChangePersonalInformationComponent,
    ChapterInfoComponent,
    PaymentComponent,
    RegisterPaymentComponent,
    RegisterInformationComponent,
    LoginComponent,
    PolicyComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ImageCropperModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ClipboardModule,
    TooltipModule.forRoot(),
    MomentModule,
  ],
  providers: [
    AppHttpService,
    LoadingIndicatorService,
    LoginModalService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
