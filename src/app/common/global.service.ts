import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public apiURL: string = "https://drpawservices.life/";
  public token="";
  public tout = 30000;
  public mb:string = "";
  public name:string = ""

  constructor() { }
}
