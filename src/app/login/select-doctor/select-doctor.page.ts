import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  loginForm: FormGroup;

  constructor(
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      // 'password': ['Drpaw@w0rk', Validators.compose([Validators.required])]
    });
   }

  ngOnInit() {
  }
  navigateHome(){
    this.router.navigate(['/tabs']);
  }
}
