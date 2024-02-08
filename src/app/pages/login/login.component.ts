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
  // emailId = new FormControl('', Validators.required);
  check:boolean;
  userRole: any;
  roleName: any;
  loader: boolean;
  // Forgot password
  display: boolean = false;
  verificationDisplay: boolean = false;
  changePasswordDisplay: boolean = false;
  emailId: FormControl = new FormControl('', [Validators.required, Validators.email]);
  verificationCode: FormControl = new FormControl('', Validators.required);
  newPassword: FormControl = new FormControl('', Validators.required);
  confirmPassword: FormControl = new FormControl('', Validators.required);

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
      const data = {
        "email": this.emailId.value
      }
      this.authService.ForgetPassword(data).subscribe((resp: any) => {
        // console.log("Response submit", resp);
        if(resp?.statusCode === 200){
          this.sharedService.showSuccess(resp.message);
          this.display = false;
          this.verificationDisplay = true;
        }else{
          this.sharedService.showError(resp.message);
        }
      },(e:any)=>{
          this.sharedService.showError(e?.message);
      });
    }else {
      this.emailId.markAsTouched();
    }
  }
  verifyEmail() {
    if (this.verificationCode.valid) {
      const data = {
        "email": this.emailId.value,
        "otp": this.verificationCode.value
      }
      this.authService.verifyOTP(data).subscribe((resp: any) => {
        console.log("Response Verfy", resp);
        if(resp?.statusCode === 200){
          this.sharedService.showSuccess(resp.message);
          this.verificationDisplay = false;
          this.changePasswordDisplay = true;
        }else{
          this.sharedService.showError(resp.message);
        }
      },(e:any)=>{
          this.sharedService.showError(e?.message);
      });
    }
  }
  changePassword() {
    if (this.newPassword.valid && this.confirmPassword.valid && this.newPassword.value === this.confirmPassword.value) {
      const data = {
        "email": this.emailId.value,
        "newPassword": this.newPassword.value,
        "confirmPassword": this.newPassword.value
      }
      this.authService.resetPassword(data).subscribe((resp: any) => {
        console.log("Response Changepawd", resp);
        if(resp?.statusCode === 200){
          this.sharedService.showSuccess(resp.message);
          this.changePasswordDisplay = false;
        }else{
          this.sharedService.showError(resp.message);
        }
      },(e:any)=>{
          this.sharedService.showError(e?.message);
      });
    }
  }

  cancel() {
    this.display = false;
  }
  cancelVerification() {
    this.verificationDisplay = false;
  }
  cancelPasswordChange() {
    this.changePasswordDisplay = false;
  }
}
