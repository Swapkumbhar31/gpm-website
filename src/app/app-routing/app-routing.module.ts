import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HomeComponent } from '../home/home.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { RefundPolicyComponent } from '../refund-policy/refund-policy.component';
import { TermsConditionsComponent } from '../terms-conditions/terms-conditions.component';
import { MembershipCoreComponent } from '../membership/membership-core/membership-core.component';
import { MembershipComponent } from '../membership/membership.component';
import { MembershipBasicComponent } from '../membership/membership-basic/membership-basic.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { RegisterComponent } from '../register/register.component';
import { ProfileComponent } from '../profile/profile.component';
import { MailVerificationComponent } from '../mail-verification/mail-verification.component';
import { ProfileSmComponent } from '../profile/profile-sm/profile-sm.component';
import { ActivityComponent } from '../profile/activity/activity.component';
import { PaymentComponent } from '../payment/payment.component';
import { RegisterPaymentComponent } from '../register-payment/register-payment.component';
import { RegisterInformationComponent } from '../register-information/register-information.component';
import { LoginComponent } from '../login/login.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'about-us',
        component: AboutUsComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'profile/activities',
        component: ActivityComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'contact-us',
        component: ContactUsComponent
    },
    {
        path: 'terms-condtions',
        component: TermsConditionsComponent
    },
    {
        path: 'membership/core',
        component: MembershipCoreComponent
    },
    {
        path: 'membership',
        component: MembershipComponent
    },
    {
        path: 'membership/basic',
        component: MembershipBasicComponent
    },
    {
        path: 'refund-policy',
        component: RefundPolicyComponent
    },
    // {
    //     path: 'register',
    //     component: RegisterComponent
    // },
    // {
    //     path: 'register/:code',
    //     component: RegisterComponent
    // },
    // {
    //     path: 'mail/verify',
    //     component: MailVerificationComponent
    // },
    {
        path: 'payment/failed',
        component: PaymentComponent
    },
    {
        path: 'register',
        component: RegisterPaymentComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register/information',
        component: RegisterInformationComponent
    },
    {
        path: 'register/:code',
        component: RegisterPaymentComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
    ],
    exports: [
        RouterModule,
    ],
    providers: [

    ],
    declarations: []
})
export class AppRoutingModule { }
