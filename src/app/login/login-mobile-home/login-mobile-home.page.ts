import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-mobile-home',
  templateUrl: './login-mobile-home.page.html',
  styleUrls: ['./login-mobile-home.page.scss'],
})
export class LoginMobileHomePage implements OnInit {
  logo_img = 'assets/imgs/UI/Dr.paw_pet.png';
  country_img = 'assets/imgs/UI/sri-lanka.png';
  login_img = 'assets/imgs/UI/login.png';
  info_img = 'assets/imgs/UI/information.svg';

  username: string = '';
  pw: string = '';

  loginForm: FormGroup;

  // screen loader
  isLoading: any;
  loader_interval: any;

  has_alert_popup = false;

  constructor(
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,

    public alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      // 'password': ['Drpaw@w0rk', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    // this.collectSettlement();
    // this.collectUserDeclineRefunds();
  }

  current_clinic = 0;
  prev_clinic = 0;

  clinic_total = 0;
  clinic_settlement = [];

  trans_pre = 'drc';

  getOTP() {
    this.router.navigate(['/login-otp-home']);
  }
}
