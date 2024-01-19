import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SpinnrService } from 'src/app/shared/services/spinnr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string = '';
  emailId = new FormControl('', Validators.required);
  display: boolean;
  check:boolean;
  userRole: any;
  roleName: any;
  loader: boolean;

  constructor(private authService: AuthService, private router: Router, private sharedService: SharedService, public spinnerService: SpinnrService) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login() {
    this.loader = false;
    //console.log("Spinner", this.spinnerService.visibility)
    if (this.loginForm.valid) {
      this.authService.authenticate(this.loginForm.value.username,this.loginForm.value.password).subscribe((resp: any) => {
        this.loader = true;
        if (resp.access_token) {
          sessionStorage.setItem('userInfo', JSON.stringify(resp));
          this.userRole = resp.data.roleId;
          this.roleName = resp.data.roleTypeName;
          // console.log("Session storage", resp);
          if (this.userRole === 1,3) {
            this.router.navigate(['/main'])
            setTimeout(() => {
              this.sharedService.showSuccess(this.roleName +' Login Successfully!');
            }, 2500);
          } else {
            this.sharedService.showError('Access Denied!');
          }
        } else {
          this.sharedService.showError('Username or password mismatch');
          this.loginError = 'Username or password mismatch';
          this.loader = false;
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  forgotPassword() {
    this.display = true;
  }
  submitFP() {
    if (this.emailId.valid) {

    } else {
      this.emailId.markAsTouched();
    }
  }
  cancel() {
    this.display = false;
  }
}
