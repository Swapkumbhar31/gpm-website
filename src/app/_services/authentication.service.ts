import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { AppHttpService } from './app-http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginModalService } from '../login-modal/login-modal-service.service';

@Injectable()
export class AuthenticationService {
	constructor(
		private appHttpService: AppHttpService,
		private router: Router,
		private route: ActivatedRoute,
		private loginModalService: LoginModalService) { }

	isLoggedIn() {
		return localStorage.getItem('api_key') !== null ? true : false;
	}

	login(values): any {
		this.appHttpService.request("login", values).subscribe(
			(response: any) => {
				if (response.status === 403) {
					localStorage.removeItem('api_key');
					this.router.navigate(['/'], { relativeTo: this.route });
					this.loginModalService.show();
					return false;
				} else {
					if (response.status === "200") {
						localStorage.setItem('api_key', response.api_key);
						this.router.navigate(['/profile'], { relativeTo: this.route });
						this.loginModalService.hide();
						return true;
					} else {
						return false;
					}
				}
			},
			(error) => {
				console.log(error);
				return false;
			}
		);
	}

	logout() {
		localStorage.removeItem('api_key');
		this.router.navigate(['/'], { relativeTo: this.route })
	}
}
