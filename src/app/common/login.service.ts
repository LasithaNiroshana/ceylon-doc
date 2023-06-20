import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError, throwError, timeout } from 'rxjs';
import {GlobalService} from '../common/global.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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

  public getOTP(mobile: string){
    const url = this.globalService.apiURL + 'get_login_otp/';
    
    const params = new HttpParams().set('lmid', mobile);

    const headers = new HttpHeaders().set("Content-Type", "application/json");
    // .set("Authorization", "token " + APIStore.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError), timeout(this.globalService.tout));
  }

  //Get auth token
  public getToken(user: any){
    const url = this.globalService.apiURL + 'api-token-auth/';
    
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.httpClient.post(url, user, {headers}).pipe(catchError(this.handleError), timeout(this.globalService.tout));
  }

  //User login
  public loginUser(userID:any){
    const url = this.globalService.apiURL + 'api-auth/login/';

    const params = new HttpParams().set('cid', userID);

    const headers = new HttpHeaders().set("Content-Type", "application/json")
    .set("Authorization", "token " + this.globalService.token);

    return this.httpClient.put(url, userID, {headers}).pipe(catchError(this.handleError), timeout(this.globalService.tout));
  }

  //Get user details
  public getUserInfo(mobile: string){
    const url = this.globalService.apiURL + 'doctor_board/';
    
    const params = new HttpParams().set('lmid', mobile);

    const headers = new HttpHeaders().set("Content-Type", "application/json")
    .set("Authorization", "token " + this.globalService.token);

    return this.httpClient.get(url, {params, headers}).pipe(catchError(this.handleError), timeout(this.globalService.tout));
  }
}
