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
  selector: 'app-medical-list',
  templateUrl: './medical-list.component.html',
  styleUrls: ['./medical-list.component.scss']
})
export class MedicalListComponent implements OnInit {
  searchForm!:UntypedFormGroup;
  dynamaicTableData: any;
  submitted: boolean;
  medicalTypeList: any[];
  isLoader: boolean;
  isNotLoader: boolean = true;
  currentLanguage:any


  constructor(public translationService: TranslationService,private formService: FormService, private router: Router, private languageService: LanguageService,
    private fb: NonNullableFormBuilder, private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
      console.log(this.currentLanguage)
      if (this.searchForm) {
        this.searchForm.patchValue({ lang: this.currentLanguage });
      }
    this.getAlrMedicalTypeList();
    this.getList();
    });
    this.initManufacturerForm();
  }
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  getAlrMedicalTypeList() {
    this.formService.getAlrMedicalTypeList(this.currentLanguage).subscribe((resp: any) => {
      this.medicalTypeList = resp.data;
      this.medicalTypeList.unshift({id: '', name: 'All'})
      console.log(resp.data)    
    });
  }
  initManufacturerForm(){
    this.searchForm = this.fb.group({
      medical_type_id: new FormControl<string>(''),
      lang:this.currentLanguage
    });
  }
  getList() {
    // this.isLoader = true;
    const reqData = {
      medicalId: '',
      lang:this.currentLanguage
    }

    this.formService.getAlrMedicalList(reqData).subscribe((resp: any) => {
      if (resp.status = 200) {
        this.dynamaicTableData = resp.data;
        // console.log("get data", this.dynamaicTableData)
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
    console.log('MedicalId',this.searchForm.value.medical_type_id)
    const reqData = {
      "medicalId": this.searchForm.value.medical_type_id,
      'lang':this.searchForm.value.lang
    }
    this.formService.getAlrMedicalList(reqData).subscribe((resp: any) => {
        setTimeout(() => {
          this.dynamaicTableData = resp.data;
          this.isNotLoader = true;
          this.isLoader = false;
        }, 600);
    });
  }

  deleteRecord(medId:number){
    const dataKey = { medicalId: medId };
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the record?',
        accept: () => {
            this.formService.deleteAlrMedical(dataKey).subscribe((resp: APIResponse) => {
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
    this.router.navigateByUrl(`main/master/medical-add/${editId}`);
  }
}
