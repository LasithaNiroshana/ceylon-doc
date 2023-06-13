import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public apiURL: string = "https://drpawservices.life/";
  public token=localStorage.getItem('token');
  public tout = 30000;

  constructor() { }
}
