import { Component, OnInit } from '@angular/core';
import { LoginModalService } from '../../login-modal/login-modal-service.service';
import { AuthenticationService } from '../../_services/authentication.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public loginModal: LoginModalService,
    public authService: AuthenticationService) { }

  ngOnInit() {
    $('.full-page-menu').mouseup(function (e) {
      var container = $('.menu-backdrop');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('#menu-backdrop').removeClass('active');
        $('.full-page-menu').fadeOut(500);
      }
    });
    $(document).ready(function () {
      $('.navbar-brand').click(() => {
        $('html, body').animate({
          scrollLeft: 0
        }, 800);
      });
      $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 50) {
          $('.navbar').css('background', '#f7f7f7');
        } else {
          $('.navbar').css('background', 'transparent');
        }
      });
    });
  }

  logout() {
    this.authService.logout();
  }

  openeNav() {
    if ($('#menu-backdrop').hasClass('active')) {
      $('.full-page-menu').fadeOut(200);
      $('#menu-backdrop').removeClass('active');
    } else {
      $('.full-page-menu').fadeIn(0);
      $('#menu-backdrop').addClass('active');
    }
  }
  closeNav() {
    $('#menu-backdrop').removeClass('active');
    $('.full-page-menu').fadeOut(500);
  }

  openModal() {
    this.loginModal.show();
  }
}
