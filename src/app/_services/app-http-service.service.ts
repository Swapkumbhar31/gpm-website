import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingIndicatorService } from './loading-indicator.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginModalService } from '../login-modal/login-modal-service.service';
@Injectable()
export class AppHttpService {

	constructor(
		private http: Http,
		public loaderService: LoadingIndicatorService,
		public router: Router,
		private route: ActivatedRoute,
		public loginModalService: LoginModalService
	) { }

	private handleError(error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}
	request(url, values: string): Observable<any> {
		const self = this;
		if (!self.loaderService.loading) {
			self.loaderService.onRequestStarted();
		}
		values = values ? JSON.parse(values) : {};
		values['api_key'] = localStorage.getItem('api_key') ? localStorage.getItem('api_key') : '';
		const headers = new Headers();
		headers.append('Accept', 'application/json');
		const options = new RequestOptions({ headers: headers });
		return self.http.post("https://fliteracy.gainpassivemoney.com/api/" + url, values, options).pipe(map((res) => {
			return res.json();
		})).pipe(
			catchError(err => {
				if (err.status === 403) {
					localStorage.removeItem('api_key');
					this.loginModalService.show();
					this.router.navigate(['/'], { relativeTo: this.route })
				}
				return of(null);
			})
		);
	}
	multiPartRequest(type, fileToUpload: any, previousFile?: any): Observable<any> {
		const self = this;
		if (!self.loaderService.loading) {
			self.loaderService.onRequestStarted();
		}
		let formData: FormData = new FormData();
		formData.append('uploadFile', fileToUpload, fileToUpload.name);
		formData.append('api_key', localStorage.getItem('api_key') ? localStorage.getItem('api_key') : '');
		let headers = new Headers();
		// headers.append('Content-Type', 'multipart/form-data');
		headers.append('Accept', 'application/json');
		let options = new RequestOptions({ headers: headers });
		let link = '';
		if (previousFile) {
			link = "https://fliteracy.gainpassivemoney.com/api/" + 'save/' + type + '/' + previousFile;
		} else {
			link = "https://fliteracy.gainpassivemoney.com/api/" + 'save/' + type;
		}
		return this.http.post(link, formData, options).pipe(map(res => res));
	}

	public getImage(imageUrl: string): Observable<any> {
		const self = this;
		const values = {};
		values['api_key'] = localStorage.getItem('api_key') ? localStorage.getItem('api_key') : '';
		const headers = new Headers();
		headers.append('Accept', 'image/jpg');
		const options = new RequestOptions({ headers: headers });
		return self.http.post("https://fliteracy.gainpassivemoney.com/api/" + imageUrl, values, options).pipe(map(res => res.json()));
	}
}
