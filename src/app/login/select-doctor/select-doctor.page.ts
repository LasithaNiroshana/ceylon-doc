import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AppointmentsService} from '../../common/appointments.service';
import {GlobalService} from '../../common/global.service';

@Component({
  selector: 'app-select-doctor',
  templateUrl: './select-doctor.page.html',
  styleUrls: ['./select-doctor.page.scss'],
})
export class SelectDoctorPage implements OnInit {
  logo_img = 'assets/imgs/UI/Dr.paw_pet.png';
  country_img = 'assets/imgs/UI/sri-lanka.png';
  login_img = 'assets/imgs/UI/login.png';
  info_img = 'assets/imgs/UI/information.svg';

  username: string = '';
  pw: string = '';
  doctorList:any=[];
  selectedDoctor:number=0;
  // screen loader
  isLoading: any;
  loader_interval: any;

  loginForm: FormGroup;

  isCardClicked: boolean = false;

  constructor(
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private appointmentService:AppointmentsService,
    private globalService:GlobalService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      // 'password': ['Drpaw@w0rk', Validators.compose([Validators.required])]
    });
   }

  ngOnInit() {
    // console.log(this.globalService.clinic);
    // var clinicID=this.globalService.clinic;
    
   
  }

  ionViewDidEnter(){
    // console.log(this.globalService.clinic);
    this.startLoader();
    this.appointmentService.getDoctorList(this.globalService.clinic).subscribe({
      next:(res:any)=>{
        this.doctorList=res;
        this.dismissLoader();
      },
      error:(e:any)=>{
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

  // getAppointmentList(doctor:any){
  //   this.selectedDoctor=doctor;
  // }

  selectDoctor(doctor:any){
    this.isCardClicked = !this.isCardClicked;
    this.globalService.doctor=doctor;
    this.router.navigate(['/tabs']);
  }

  
}
