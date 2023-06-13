import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { CodeInputModule } from 'angular-code-input';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-login-otp-home',
  templateUrl: './login-otp-home.page.html',
  styleUrls: ['./login-otp-home.page.scss'],
})
export class LoginOtpHomePage implements OnInit {
  logo_img = 'assets/imgs/UI/Dr.paw_pet.png';
  info_img = 'assets/imgs/UI/information.svg';
  country_img = 'assets/imgs/UI/sri-lanka.png';
  login_img = 'assets/imgs/UI/login.png';

  constructor(
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,

    public alertController: AlertController
  ) {}

  ngOnInit() {}

  getOTP() {
    this.router.navigate(['/tabs']);
  }
}
