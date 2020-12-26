import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppHttpService } from '../_services/app-http-service.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  public modalRef: BsModalRef;
  profile: any = {};
  progress; any = {};
  isCopied: any;
  isLoading = false;
  imageUrl = 'https://fliteracy.gainpassivemoney.com/api/profile/pic/thumbnail/null';
  imageChangedEvent: any = '';
  croppedImage: any = '';
  @ViewChild('imagecropper') imagecropper;
  @ViewChild('fileInput') fileInput;
  constructor(
    private appHttpService: AppHttpService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private modalServiceBs: BsModalService) {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/'], { relativeTo: this.route });
    }
  }

  ngOnInit() {
    const self = this;
    this.titleService.setTitle('Gainpassivemoney.com : Profile');
    this.appHttpService.request('profile', '').subscribe(((response) => {
      this.user = response.data;
      console.log(this.user)
      if (this.user.pancard === "-1") {
        this.router.navigate(['/register/information'], { relativeTo: this.route });
      } else if (!this.user.id) {
        this.authService.logout();
      }
      self.imageUrl = "https://fliteracy.gainpassivemoney.com/api/" + 'profile/pic/thumbnail/' + self.user.profile_img_url;
    }));
    this.appHttpService.request('profile/getearning', '').subscribe(((response) => {
      this.profile = response;
    }));
    this.appHttpService.request('profile/progress', '').subscribe(((response) => {
      this.progress = response;
      console.log(this.progress)
    }));
  }

  public openModalBs(template: TemplateRef<any>) {
    this.modalRef = this.modalServiceBs.show(template, { backdrop: 'static' });
  }

  public closeModal() {

    this.modalRef.hide();
  }

  updateUser(user: any) {
    this.user = user;
  }

  scrollToTop() {
    $('html, body').animate({
      scrollTop: 0
    }, 200);
  }

  saveProfile(template: TemplateRef<any>) {
    $('#profilefile').click();
  }
  onFileChange(event) {
    // Replace extension according to your media type
    const imageName = 'abc' + '.jpeg';
    // call method that creates a blob from dataUri
    const imageBlob = this.dataURItoBlob(this.croppedImage);
    const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
    // this.imageChangedEvent = event;
    const self = this;
    let fi = self.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = imageFile;
      self.isLoading = true;
      self.appHttpService
        .multiPartRequest('profiles', fileToUpload).subscribe((response) => {
          self.isLoading = false;
          this.modalRef.hide();
          self.user = JSON.parse(response._body).data;
          self.imageUrl = "https://fliteracy.gainpassivemoney.com/api/" + 'profile/pic/thumbnail/' + self.user.profile_img_url;
        },
          err => { },
          () => {

          });
    } else {
      self.modalRef.hide();
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(event);
    if (event.target.value !== '') {
      this.modalRef = this.modalServiceBs.show(this.imagecropper, { backdrop: 'static' });
    }

  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
  dataURItoBlob(dataURI) {
    let imgData = dataURI.split(',');
    const byteString = atob(imgData[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    return blob;
  }
}
