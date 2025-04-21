import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-remove-account',
  templateUrl: './remove-account.component.html',
  styleUrls: ['./remove-account.component.scss']
})
export class RemoveAccountComponent implements OnInit {
  displayEmailPopup: boolean = false;
  email: string = '';
  otp: string = '';
  otpSent: boolean = false;
  isDeleted: boolean = false;
  UserID:any;
  constructor(private confirmationService: ConfirmationService, private formService: FormService, private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
  }
  confirmDeleteAccount() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete your account?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.displayEmailPopup = true;
        this.submitDeleteAccount();
      }
    });
  }
  otps: any;
  sendOtp() {
    if (this.email) {
      const email = {
        "email": this.email
      }
      this.formService.sendEmail(email).subscribe((resp: any) => {
        if (resp.statusCode == 200) {
          this.otpSent = true;
          // this.otp = resp.data.otp
            this.UserID = resp.data.userId
          this.sharedService.showSuccess(resp.message);
        }
        else if(resp.statusCode == 401) {
       this.sharedService.showError(resp.message)
        }
      },
        (error) => {
          console.error('Error sending OTP:', error);
        }
      );
    }
    else {
      this.sharedService.showError("Please Enter Your Email");
    }

  }
  submitDeleteAccount() {
    if (this.email) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete your account?',
        header: 'Confirm Deletion',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const payload = {
            userId: this.UserID,
            otp: this.otp
          };
          this.formService.removeUser(payload).subscribe((resp: any) => {
            if (resp.statusCode === 200) {
              this.sharedService.showSuccess(resp.message);
              this.displayEmailPopup = false;
              this.email = null;
              this.UserID = null;
              this.otp=null;
              this.router.navigate(['/deative-account']);
            }
            else if(resp.statusCode == 401) {
              this.sharedService.showError(resp.message)
               }
          }
        );
        },
        reject: () => {
          this.sharedService.showError('Account deletion canceled');
        }
      });
    } else {
      this.sharedService.showError('Please enter your email');
    }
  }

  confirmDelete() {
    if (confirm("Are you sure you want to remove your account?")) {
      this.formService.deleteUser(1).subscribe(
        () => {
          this.isDeleted = true;
          setTimeout(() => this.router.navigate(['/']), 3000);
        },
        (error) => {
          console.error('Error removing account:', error);
        }
      );
    }
  }
}
