import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  dynamaicTableData: any;
  submitted: boolean;
  isLoader: boolean;
  isNotLoader: boolean;
  currentLanguage:any


  constructor(public translationService: TranslationService,private languageService: LanguageService,private formService: FormService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage   = language
      this.getuserdetails();
    });
  }
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  } 
  getuserdetails(){ 
    this.isLoader = true;
    this.formService.getuserDetails(this.currentLanguage).subscribe((resp: any) => {
      if (resp.status = 200) {
        this.dynamaicTableData = resp.data;
        this.isNotLoader = true;
        this.isLoader = false;
    } else {
      this.sharedService.showError('Error');
    }
  },
  (error) => {
    this.sharedService.showError('Error');
  }
)
};
  }

