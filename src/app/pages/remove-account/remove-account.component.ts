import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {FormService} from 'src/app/shared/services/form.service';
import {SharedService} from 'src/app/shared/services/shared.service';

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
    UserID: any;

    constructor(private confirmationService: ConfirmationService, private formService: FormService, private sharedService: SharedService, private router: Router) {
    }

    ngOnInit(): void {
    }

    // Set the default panel to be the instructions (1)
    panelOpenState: number | null = 1;

    togglePanel(panel: number) {
        // Always collapse the other panel when one is opened
        this.panelOpenState = this.panelOpenState === panel ? null : panel;
    }

    isPanelOpen(panel: number) {
        return this.panelOpenState === panel;
    }

    openApp() {
        const deepLink = 'app://com.senior_citizen';
        const playStoreLink = 'https://play.google.com/store/apps/details?id=com.senior_citizen';

        let appOpened = false;

        // Try opening the deep link
        window.location.href = deepLink;

        // If the app opens, this prevents the fallback
        const start = Date.now();
        const checkAppOpened = setInterval(() => {
            if (Date.now() - start > 2500) {
                clearInterval(checkAppOpened);
                if (!appOpened) {
                    // Redirect to Play Store if the app is not opened after 1.5 seconds
                    window.location.href = playStoreLink;
                }
            }
        }, 500);
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
                    } else if (resp.statusCode == 401) {
                        this.sharedService.showError(resp.message)
                    }
                },
                (error) => {
                    console.error('Error sending OTP:', error);
                }
            );
        } else {
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
                                this.otp = null;
                                this.router.navigate(['/deative-account']);
                            } else if (resp.statusCode == 401) {
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
