import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from './utilities/passwordvalidation';
import { AuthService } from './shared/services/auth.service';
import { SharedService } from './shared/services/shared.service';
import { TranslationService } from './shared/services/translation.service';
import { LanguageService } from './shared/services/language.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    resetPasswordForm: FormGroup;
    items: MenuItem[];
    ResetModal: boolean; displaySOS: boolean = false;
    userName: string = '';
    firstName: any;
    roleName: string = '';
    showThemeConfig: boolean = false;
    userData: any;
    isTNeb: any;
    isAdmin: any;
    isUser: any;
    userId: any;
    currentLanguage: string;
    constructor(public app: AppComponent, private formBuilder: FormBuilder,private translationService: TranslationService,
        private languageService: LanguageService,
         public appMain: AppMainComponent, private router: Router, private authService: AuthService, private sharedService: SharedService) 
         { 
            this.languageService.currentLanguage$.subscribe(language => {
                this.currentLanguage = language;
              });
        }
      
  toggleLanguage(): void {
    const newLanguage = this.currentLanguage === 'en' ? 'ta' : 'en';
    this.languageService.setLanguage(newLanguage);
  }
          getTranslation(key: string): string {
            return this.translationService.getTranslation(key);
          }
    ngOnInit(): void {
        this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
        if (this.userData.data.roleId === 1) {
            this.isAdmin = true;
        } else if(this.userData.data.roleId === 2) {
            this.isTNeb = true;
        } else {
            this.isUser = true;
        }
        this.firstName = this.userData.data.firstName;
        this.userName = this.userData.data.roleTypeName;
        this.roleName = this.userData.data.role;
        this.userId = this.userData.data.userId;
        this.initResetPwdForm();
    }
    initResetPwdForm() {
        this.resetPasswordForm = this.formBuilder.group(
            {
                currentPassword: ['', Validators.required],
                newPassword: ['', Validators.required],
                confirmPassword: ['', Validators.required],
            },
            {
                validators: [PasswordValidation.match('newPassword', 'confirmPassword')]
            }
        );
    }
    logout() {
        this.router.navigate(['/']);
        sessionStorage.removeItem('userInfo');
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    resetpassword() {
        this.ResetModal = true;
    }
    onResetSubmit() {
        if (this.resetPasswordForm.valid) {
            const userId = this.userId;
            const currentPassword = this.resetPasswordForm.value.currentPassword;
            const newPassword = this.resetPasswordForm.value.newPassword;
            const confirmPassword = this.resetPasswordForm.value.confirmPassword;
            const dataForm = {userId, currentPassword, newPassword, confirmPassword};
            //console.log("data", dataForm);
            this.authService.changePassword(dataForm).subscribe((resp: any) => {
                if (resp.statusCode == 200) {
                    this.sharedService.showSuccess(resp.message);
                    setTimeout(() => {
                        this.ResetModal = false;
                    }, 1000);
                } else {
                    this.sharedService.showError(resp.message);
                }
            }, (err: Error) => {
                this.sharedService.showError('Problem occurred, Please try again');
            });
        } else {
          this.resetPasswordForm.markAllAsTouched();
        }
    }
}
