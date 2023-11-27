import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { ConfirmationService } from 'primeng/api';
import { APIResponse } from 'src/app/shared/models/api-response';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-old-age-list',
  templateUrl: './old-age-list.component.html',
  styleUrls: ['./old-age-list.component.scss']
})
export class OldAgeListComponent implements OnInit {
  searchForm!:UntypedFormGroup;
  dynamaicTableData: any;
  submitted: boolean;
  oahType: any[];
  isLoader: boolean;
  isNotLoader: boolean= true;
  currentLanguage:any

  constructor(public translationService: TranslationService,private fb: NonNullableFormBuilder,private languageService: LanguageService,
     private formService: FormService, private router: Router, private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
      console.log(this.currentLanguage)
      if (this.searchForm) {
        this.searchForm.patchValue({ lang: this.currentLanguage });
      }
    this.getList();
    this.getoahTypeList();
    });
    this.initManufacturerForm();
  }
  
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  initManufacturerForm(){
    this.searchForm = this.fb.group({
      oah_type: new FormControl<string>(''),
      lang:this.currentLanguage
    });
  }

  getoahTypeList() {
    this.formService.getoahTypeList(this.currentLanguage).subscribe((resp: any) => {
      this.oahType = resp.data;
      this.oahType.unshift({id: '', name: 'All'})
    });
  }

  getList() {
    // this.isLoader = true;
    const reqData = {
      "oahId": '',
      lang:this.currentLanguage
    }
    this.formService.getOldAgeList(reqData).subscribe((resp: any) => {
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
  //Search_list
  searchDetails() {
    this.isLoader = true;
    this.isNotLoader = false;
    const reqData = {
      "oahId": this.searchForm.value.oah_type,
      "lang":this.searchForm.value.lang
    }
    this.formService.getOldAgeList(reqData).subscribe((resp: any) => {
        setTimeout(() => {
          this.dynamaicTableData = resp.data;
          this.isNotLoader = true;
          this.isLoader = false;
        }, 600);
    });
  }

  deleteRecord(oldageId:number){
    const dataKey = { oahId: oldageId };
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the record?',
        accept: () => {
            this.formService.deleteoah(dataKey).subscribe((resp: APIResponse) => {
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
    this.router.navigateByUrl(`main/master/oldage-add/${editId}`);
  }

}
