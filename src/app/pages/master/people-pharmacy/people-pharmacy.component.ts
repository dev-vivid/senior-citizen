import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { ConfirmationService } from 'primeng/api';
import { APIResponse } from 'src/app/shared/models/api-response';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-people-pharmacy',
  templateUrl: './people-pharmacy.component.html',
  styleUrls: ['./people-pharmacy.component.scss']
})
export class PeoplePharmacyComponent implements OnInit {
  dynamaicTableData: any;
  submitted: boolean;
  currentLanguage:any
  // isLoader: boolean;
  // isNotLoader: boolean;

  constructor(public translationService: TranslationService,private formService: FormService, private router: Router,
    private languageService: LanguageService, private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService, private sharedService: SharedService) { }

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
    // this.isLoader = true;
    this.formService.getPeoplePharmacyList(this.currentLanguage).subscribe((resp: any) => {
      if (resp.status = 200) {
        this.dynamaicTableData = resp.data;
        // this.isNotLoader = true;
        // this.isLoader = false;
    }else {
      this.sharedService.showError('Error');
    }
  },
  (error) => {
    this.sharedService.showError('Error');
  }
)
  }

  deleteRecord(ppId:number){
    const dataKey = { peoplePharmacyId: ppId };
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the record?',
        accept: () => {
            this.formService.deletePeoplePharmacy(dataKey).subscribe((resp: APIResponse) => {
                // console.log("datakey",dataKey);
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

  editRecord(editId:number) {
    this.router.navigateByUrl(`main/master/people-pharmacy-add/${editId}`);
  }

}
