import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ToastController,LoadingController,AlertController,} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../../common/login.service';
import {GlobalService} from '../../common/global.service';

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
    public alertController: AlertController,
    private loginService:LoginService,
    private globalService:GlobalService
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

  ionViewDidLeave(){
    this.has_alert_popup = false;
  }

  current_clinic = 0;
  prev_clinic = 0;

  clinic_total = 0;
  clinic_settlement = [];

  trans_pre = 'drc';

  // getOTP() {
  //   this.router.navigate(['/login-otp-home']);
  // }

  inputOnChange(event: any){
    if(event.length == 10){
      this.getOTP();
    }
  }

  // getOTP(){
  //   this.username = this.loginForm.value.username;
  //   this.loginService.getOTP(this.username).subscribe({
  //     next:(res:any)=>{
  //       console.log(res);
  //     }
  //   });
  // }

  getOTP(){
    this.startLoader();

    this.username = this.loginForm.value.username;

    this.loginService.getOTP(this.username).subscribe({
      next:(result:any)=>{
        if(result.success === 0){
          this.globalService.mb = result.mobile;
          this.globalService.name = result.name;

          this.loginForm.reset();
          this.router.navigate(['/login-otp-home']);
          this.dismissLoader();
        } else{
          this.wrongNumberLogin();
          this.dismissLoader();
        }
      },
      error:(err: any) => {
        if(err.code === 401){
          this.loginError();
        } else if(err.code === 408 || err.code === 0 || err.name === "TimeoutError"){
          this.timeOutError();
        } else{
          this.APIError();
        }
        this.dismissLoader();
      }
    });
  }

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

  async wrongNumberLogin () {
    const alert = await this.alertController.create({
      backdropDismiss: false ,
      cssClass: 'my-custom-class',
      header: 'Incorrect or Unregistered Mobile',
      message: 'This mobile number is not registered with Dr.Paw. Please enter the correct mobile number or if you are new to the system , please register.',
      buttons: [{
          text: 'Re-Enter',
          id: 'confirm-button',
          handler: () => {
          }
        },
        {
          text: 'Register',
          id: 'decline-button',
          handler: () => {
            // console.log('Confirm Okay');

            this.loginForm.reset();
            this.userRegister();
          }
        }
      ]
    });

    await alert.present();
  }

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

  userRegister(){
    // this.loginForm.reset()
    // this.router.navigate(['/register']);
    this.router.navigate(['/terms-condition']);
    // this.router.navigate(['/aboutus']);
  }

  
}
