import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-mobile-app-install',
  templateUrl: './mobile-app-install.component.html',
  styleUrls: ['./mobile-app-install.component.scss']
})
export class MobileAppInstallComponent implements OnInit {
  dynamaicTableData: any;
  submitted: boolean;
  isLoader: boolean;
  isNotLoader: boolean;
  currentLanguage:any
  cols: any[];

  constructor(public translationService: TranslationService,private confirmationService: ConfirmationService,private languageService: LanguageService,private formService: FormService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
      console.log(this.currentLanguage)
    this.getList();
    });
  }

   getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  } 
  getList() {
    this.isLoader = true;
    this.formService.getMobInstallList(this.currentLanguage).subscribe((resp: any) => {
      if (resp.status = 200) {
        this.dynamaicTableData = resp.data.values;
        this.cols = resp.data.cols
        this.isNotLoader = true;
        this.isLoader = false;
    } else {
      this.sharedService.showError('Error');
    }
  },
  (error) => {
    this.sharedService.showError('Error');
  }
)};
onDelete(userId: number) {
  const payload = { userId: userId.toString() }; 
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete the record?',
    accept: () => {
        this.formService.deleteUser(payload).subscribe((resp: APIResponse) => {
            if (resp.statusCode == '200') {
              this.getList();
              this.sharedService.showSuccess('Record delete successfully');
            }
        })
    },
    reject: () => {
        this.sharedService.showWarn('Cancelled');
    }
});
}

}
