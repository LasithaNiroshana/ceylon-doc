import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public apiURL: string = "https://drpawservices.life/";
  public token="";
  public tout = 30000;
  public mb:string = "";
  public name:string = "";
  public email:string = "";
  public clinic:number = 0;
  public id:number = 0;
  public address:string = "";
  public city:string = ""
  public doctor:number = 0;

  constructor() { }
}
