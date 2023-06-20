import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError, throwError,timeout } from 'rxjs';
import {GlobalService} from '../common/global.service'

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  

  constructor(private httpClient: HttpClient,private globalService:GlobalService) { }
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = {"type":"unknown", "name": "Unknown", "code":0, "message":"unknown"};
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = {"type":"client", "name": "ClientError", "code":0, "message":error.error.message};
    } else {
      // Server-side errors
      errorMessage = {"type":"server", "name": "TimeoutError", "code":error.status, "message":error.message};
    }

    return throwError(() => errorMessage);
  }

  //Get doctors list of the clinic 
  public getDoctorList(clinic:number){
    const url = this.globalService.apiURL + 'doctor_board/?cid=' + clinic;
    
    // const params = new HttpParams().set('cid', clinic);

    const headers = new HttpHeaders().set("Content-Type", "application/json")
    .set("Authorization", "token " + this.globalService.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError), timeout(this.globalService.tout));
  }

  //Get appoinmtments of a doctor
  // public getAppointmentsDoctor(doctor:string,startDate:string){
  //   const url = this.globalService.apiURL + 'pet_appointment/?adid=' + doctor + '&sdt' + startDate;
    
  //   const headers = new HttpHeaders().set("Content-Type", "application/json")
  //   .set("Authorization", "token " + this.globalService.token);

  //   return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError), timeout(this.globalService.tout));
  // }

  // //Get appointments of a clinic
  // public getAppointmentsClinic(cid:number,stdt:string,endt:string){
  //   const url = this.globalService.apiURL + 'pet_appointment/' + '?vdid=' + cid + '&sdt=' + stdt;
    
  //   const headers = new HttpHeaders().set("Content-Type", "application/json")
  //   .set("Authorization", "token " + this.globalService.token);

  //   return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError));
  // }

  public getAppointmentsDoctor(vid:number,stdt:string){
    const url = this.globalService.apiURL + 'pet_appointment/?adid=' + vid + '&sdt='+ stdt;
    
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    .set("Authorization", "token " + this.globalService.token);

    return this.httpClient.get(url, {headers}).pipe(catchError(this.handleError),timeout(this.globalService.tout));
  }
}
