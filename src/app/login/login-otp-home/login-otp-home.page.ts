import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {GlobalService} from '../../common/global.service';
import {LoginService} from '../../common/login.service';

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

  loginOTPForm: FormGroup;

  // screen loader
  isLoading: any;
  loader_interval: any;

  user_name: string="";
  username: string = "";
  pw: string = "";

  otp: string="";
  pincode: string="";
  has_alert_popup = false;
  otpNumber: string = '';
  showOTPInput: boolean = false;
  otpMessage: string = 'An OTP is sent to your number. You should receive it in 15 s'

  constructor(
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private globalService:GlobalService,
    private loginService:LoginService
  ) {
    this.loginOTPForm = this.formBuilder.group({
      'username': [''],
      'password': ['']
    });
  }

  ngOnInit() {}

  ionViewDidEnter(){
    this.user_name = this.globalService.name;
  }

  getOTP() {
    this.router.navigate(['/select-doctor']);
  }

  tryAgain(){
    this.router.navigate(['']);
  }

  // if(err.name === "TimeoutError"){
  //   this.timeOutError();
  // }else{
  //   if(err.code === 401){
  //     this.loginError();
  //   } else{
  //     this.APIError();
  //   }
  // }

  async timeOutError () {
    if(this.has_alert_popup){
      return;
    }

    if(!this.has_alert_popup){
      this.has_alert_popup = true;
    }
    const alert = await this.alertController.create({
      backdropDismiss: false ,
      cssClass: 'my-custom-class',
      header: 'Poor Internet Connectivity',
      message: 'No or poor Internet. Please check your wifi or mobile data connectivity.  ',
      buttons: [{
          text: 'Try Again',
          id: 'confirm-button',
          handler: () => {
            // console.log('Confirm Okay');

            // this.loginForm.reset();
            this.has_alert_popup = false;
          }
        }
      ]
    });

    await alert.present();
  }
  
  async loginError () {
    if(this.has_alert_popup){
      return;
    }

    if(!this.has_alert_popup){
      this.has_alert_popup = true;
    }
    const alert = await this.alertController.create({
      backdropDismiss: false ,
      cssClass: 'my-custom-class',
      header: 'Time Out',
      message: 'You have been inactive for a long period. Please relogin to use the App. ',
      buttons: [{
          text: 'Try Again',
          id: 'confirm-button',
          handler: () => {
            // console.log('Confirm Okay');

            // this.loginForm.reset();
            this.has_alert_popup = false;
          }
        }
      ]
    });

    await alert.present();
  }

  async APIError () {
    if(this.has_alert_popup){
      return;
    }

    if(!this.has_alert_popup){
      this.has_alert_popup = true;
    }
    const alert = await this.alertController.create({
      backdropDismiss: false ,
      cssClass: 'my-custom-class',
      header: 'Technical Issues',
      message: 'We have encountered a temporary technical issue. Check connectivity or try again. ',
      buttons: [{
          text: 'Try Again',
          id: 'confirm-button',
          handler: () => {
            // console.log('Confirm Okay');

            // this.loginForm.reset();
            this.has_alert_popup = false;
          }
        }
      ]
    });

    await alert.present();
  }

  async wrongOTPLogin () {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'OTP Not Correct',
      message: 'OTP entered is not correct or expired. Please enter the correct OTP or request new OTP. ',
      buttons: [{
          text: 'Reenter OTP',
          id: 'confirm-button',
          handler: () => {

          }
        },
        {
          text: 'Resend OTP',
          id: 'decline-button',
          handler: () => {
            this.loginOTPForm.reset();
            this.resendOTP();
          }
        }
      ]
    });

    await alert.present();
  }

  // screen loader
  // "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small" 
  startLoader() {
    this.isLoading = true;
    this.loadingController.create({
        // message: 'Loading...',
        spinner: 'dots',
        cssClass:'custom-loader-class'
    }).then((response) => {
      this.isLoading = false;
        response.present();
    });
  }

  // Dismiss loader
  stopLoader() {
    this.loadingController.dismiss().then((response) => {
        clearInterval(this.loader_interval);
    }).catch((err) => {
        // console.log('Error occured : ', err);
    });
  }
  // end of screen loader

  dismissLoader(){
    if(this.isLoading){
      this.loader_interval = setInterval(() => {
        this.stopLoader();
      }, 100);
    }else{
      this.stopLoader();
    }
  }

  userLogin() {
    this.loginOTPForm.reset();
    this.router.navigate(['/tabs/dashboard-home']);
  }

  userRegister(){
    // this.loginForm.reset()
    this.router.navigate(['/login-mobile']);
    // this.router.navigate(['/terms-condition']);
    // this.router.navigate(['/aboutus']);
  }

  loginUser(){
    this.startLoader();
    // this.loginOTPForm.value.password = this.pincode;
    this.loginOTPForm.value.username = "po-" + this.globalService.mb;
    this.username = this.loginOTPForm.value.username;

    let record = this.loginOTPForm.value;
    this.loginService.getToken(record).subscribe({
      next:(result:any)=>{
        this.globalService.token = result.token;
        this.loginOTPForm.value.password = "";
        this.loginOTPForm.reset();
        this.getInfo();
      },
      error:(err:any)=>{
        if(err.code === 401){
          this.loginError();
        } else if(err.code === 400){
          this.wrongOTPLogin();
        } else if(err.code === 408 || err.code === 0 || err.name === "TimeoutError"){
          this.timeOutError();
        } else{
          this.APIError();
        }
        this.dismissLoader();
      }
    });
  }

  getInfo(){
    this.loginService.getUserInfo(this.globalService.mb).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.loginOTPForm.reset();
      this.router.navigate(['/tabs']);

      this.dismissLoader();
      },
      error:(err:any)=>{
          // console.log(err);
        this.dismissLoader();
        if(err.code === 401){
          this.loginError();
        } else if(err.code === 408 || err.code === 0 || err.name === "TimeoutError"){
          this.timeOutError();
        } else{
          this.APIError();
        }
      }
    }
    );
  }

  resendOTP(){
    this.startLoader();
    this.loginService.getOTP(this.globalService.mb).subscribe(
      (result: any)=>{
        this.dismissLoader();
      },
      (err: any) => {
        this.dismissLoader();
      }
    );
  }

  // this called every time when user changed the code
  onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    // console.log(code);
    this.loginOTPForm.value.password = code;
    this.loginUser();
  }

  onOtpChange(event:any) {
    if(event.length == 6){
      // this.loginOTPForm.value.password = this.otp;
      // this.loginUser();
      console.log('working');
    }
  }

  inputOnChange(event:any){
    if(event.length == 6){
      this.loginUser();
    }
  }
}
