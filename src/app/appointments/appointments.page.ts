import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import {DatePipe} from '@angular/common';
import { Filesystem, Directory } from '@capacitor/filesystem';
import {GlobalService} from '../common/global.service';
import {AppointmentsService} from '../common/appointments.service';
import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {

appointmentList:any=[];

 // screen loader
 isLoading: any;
 loader_interval: any;
 has_alert_popup = false;

  constructor(private globalService:GlobalService, private appointmentService:AppointmentsService, private datepipe:DatePipe, public toastController: ToastController,
    public loadingController: LoadingController,public alertController: AlertController) { }

  ngOnInit() {}

  ionViewDidEnter(){
    // console.log(this.globalService.doctor);
    this.startLoader();
    let today = new Date();
    today.setDate(today.getDate());
    let  todayDate:string = this.datepipe.transform(today, 'yyyy-MM-dd') as string;
    this.appointmentService.getAppointmentsDoctor(this.globalService.doctor,todayDate).subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.appointmentList=res;
      },
      complete:()=>{
        this.dismissLoader();
      },
      error:(err:any)=>{
        this.dismissLoader();
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

  async selectCamera() {
    const image = await Camera.getPhoto({
        quality: 20,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera // Camera, Photos or Prompt!
        // source: CameraSource.Photos // Camera, Photos or Prompt!
    });
  }

  async selectPhotos() {
    const image = await Camera.getPhoto({
        quality: 20,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos // Camera, Photos or Prompt!
        // source: CameraSource.Photos // Camera, Photos or Prompt!
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
}
