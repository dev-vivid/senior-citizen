import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {

  dynamaicTableData: any;
  submitted: boolean;
  isLoader: boolean;
  isNotLoader: boolean;
  currentLanguage:any
  constructor(public translationService: TranslationService,private formService: FormService,private languageService: LanguageService,
     private router: Router,private sharedService: SharedService) { }

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
    this.formService.getfeedbackList(this.currentLanguage).subscribe((resp: any) => {
      if (resp.status = 200) {
        this.dynamaicTableData = resp.data;
        console.log("Data-", this.dynamaicTableData)
        this.isNotLoader = true;
        this.isLoader = false;
      }
       else {
          this.sharedService.showError('Error');
        }
      },
      (error) => {
        this.sharedService.showError('Error');
      }
    )
  };
  }


