import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl:string='';
  constructor(private http:HttpClient) { 
    this.apiUrl = environment.endPoint;
  }

  authenticate(data:any){
    //console.log("data", data)
    return this.http.post(`${this.apiUrl}User/login`, data);
  }
  //Reset
  changePassword(data: any) {
    return this.http.post(`${this.apiUrl}User/changePassword`, data);
  }
}
