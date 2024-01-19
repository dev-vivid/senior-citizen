import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  authenticate(username: string, password: string) {
    const encodedCredentials = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      'Authorizationdata': `ScHReBIOe1KEWSqX${encodedCredentials}`
    });

    // Send the request to the server
    return this.http.post(`${this.apiUrl}Admin/login`, {}, { headers });
  }
  //Reset
  changePassword(data: any) {
    return this.http.post(`${this.apiUrl}User/changePassword`, data);
  }
}
