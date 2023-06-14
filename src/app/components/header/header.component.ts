import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  logOut(){
    // console.log('sdkjlvdlkfvn');
  }

  handlerMessage = '';
  roleMessage = '';

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        // this.handlerMessage = 'Alert canceled';
        // console.log('canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        // this.handlerMessage = 'Alert confirmed';
        this.router.navigate(['']);
      },
    },
  ];

  setResult(ev:any) {
    this.roleMessage = `Dismissed with role: ${ev.detail.role}`;
  }
}
