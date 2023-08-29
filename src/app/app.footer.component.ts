import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppMainComponent } from './app.main.component';
import { AuthService } from './shared/services/auth.service';
import { SharedService } from './shared/services/shared.service';
import { PasswordValidation } from './utilities/passwordvalidation';
@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html',
  styles: [`
  .fixed{
    bottom:0;
position:fixed;
width:100%;
padding-bottom:0px !important;
  }
  .bg-clr{
  background-color:  #005ca6 !important;
  }
  .home-span{
    padding:6px !important;
  }
  `]
})
export class AppFooterComponent implements OnInit {
  subscription: Subscription;
    resetPasswordForm: FormGroup;
    items: MenuItem[];
    display: boolean;
    userName: string = '';
    roleName: string = '';
  constructor(private router: Router,private sharedService:SharedService, public appMain: AppMainComponent,private fb:FormBuilder) { }

  ngOnInit(): void {
    const userData = JSON.parse(sessionStorage.getItem('userInfo'));
    this.userName = userData.data.firstName;
    this.roleName = userData.data.roleName;
    //console.log("log data",this.userId);
  }
  logout() {
    this.router.navigate(['/']);
    sessionStorage.removeItem('userInfo');
  }
  gotToHome() {
    this.router.navigate(['/main']);
  }
  resetpassword() {
    this.display = true;
  }

}