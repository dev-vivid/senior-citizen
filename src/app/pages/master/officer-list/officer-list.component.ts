import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { ConfirmationService } from 'primeng/api';
import { APIResponse } from 'src/app/shared/models/api-response';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-officer-list',
  templateUrl: './officer-list.component.html',
  styleUrls: ['./officer-list.component.scss']
})
export class OfficerListComponent implements OnInit {
  searchForm!:UntypedFormGroup;
  dynamaicTableData: any;
  submitted: boolean;
  offTypeList: any[];
  isLoader: boolean;
  isNotLoader: boolean = true;
  currentLanguage:any

  constructor(public translationService: TranslationService,private languageService: LanguageService,
    private formService: FormService, private router: Router, private fb: NonNullableFormBuilder, private confirmationService: ConfirmationService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
      console.log(this.currentLanguage)
      this.getInitList()
      if (this.searchForm) {
        this.searchForm.patchValue({ lang: this.currentLanguage });
      }
    this.getofficerTypeList();
    });
    // this.getInitList();
    this.initManufacturerForm();
  }
  
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  initManufacturerForm(){
    this.searchForm = this.fb.group({
      officer_id: new FormControl<string>(''),
      lang:this.currentLanguage
    });
  }
  getofficerTypeList() {
    this.formService.getofficerTypeList(this.currentLanguage).subscribe((resp: any) => {
      this.offTypeList = resp.data;
      this.offTypeList.unshift({id: '', name: 'All'})
    });
  }

  getInitList() {
    // this.isLoader = true;
    const reqData = {
      "OfficerId": '',
      lang:this.currentLanguage
    }
    this.formService.getOfficerList(reqData).subscribe((resp: any) => {
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
  //Search load list
  searchDetails() {
    this.isLoader = true;
    this.isNotLoader = false;
    const reqData = {
      "OfficerId": this.searchForm.value.officer_id,
      "lang":this.searchForm.value.lang
    }
    this.formService.getOfficerList(reqData).subscribe((resp: any) => {
      setTimeout(() => {
        this.dynamaicTableData = resp.data;
        this.isNotLoader = true;
        this.isLoader = false;
      }, 600);
    });
  }

  deleteRecord(delId:number){
    const dataKey = { officerId: delId };
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the record?',
        accept: () => {
            this.formService.deleteofficer(dataKey).subscribe((resp: APIResponse) => {
                // console.log("datakey",dataKey);
                if (resp.statusCode == '200') {
                  this.getInitList();
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
    this.router.navigateByUrl(`main/master/officer-add/${editId}`);
  }

}
