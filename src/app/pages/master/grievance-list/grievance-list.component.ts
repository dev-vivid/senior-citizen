import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-grievance-list',
  templateUrl: './grievance-list.component.html',
  styleUrls: ['./grievance-list.component.scss']
})
export class GrievanceListComponent implements OnInit {
  searchForm!:UntypedFormGroup;
  searchHeader: any[] = ['district'];
  loading: boolean;
  dynamaicTableData: any;
  grivenceTypeList:any
  isLoader: boolean;
  isNotLoader: boolean = true;
  grivenceType:''
  currentLanguage:any

  constructor( private router: Router,private formService: FormService,private languageService: LanguageService,
     private fb: NonNullableFormBuilder, private sharedService: SharedService,
    public translationService: TranslationService
    ) { }

  ngOnInit(): void {
    this.getGrivenceTypeList();
    this.initManufacturerForm();
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
      this.getList();
      // console.log(this.currentLanguage)
      if (this.searchForm) {
        this.searchForm.patchValue({ lang: this.currentLanguage });
      }
    });
  }
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }


  getGrivenceTypeList() {
    this.formService.getGrivenceTypeList().subscribe((resp: any) => {
      this.grivenceTypeList = resp.data;
      // this.grivenceTypeList.unshift({id: '', name: 'All'})
    });
  }
  initManufacturerForm(){
    this.searchForm = this.fb.group({
      grivenceId_type_Id: new FormControl<string>(''),
      lang:this.currentLanguage
    });
  }
  viewGrivenance(rowdata:any){
    const griveanceId = rowdata.id
    this.router.navigateByUrl(`main/master/grievance-form/${griveanceId}`);
  }
  getList() {
    // this.isLoader = true;
    const reqData = {
      "grievanceStatus": "1",
      lang:this.currentLanguage
    }
    console.log(reqData);
    this.formService.getGrivanceList(reqData).subscribe((resp: any) => {
      if (resp.status = 200) {
        this.dynamaicTableData = resp.data;
        console.log("get data", this.dynamaicTableData)
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
  searchDetails() {
    this.isLoader = true;
    this.isNotLoader = false;
    const reqData = {
      "grievanceStatus": this.searchForm.value.grivenceId_type_Id,
      "lang":this.currentLanguage
    }
    this.formService.getGrivanceList(reqData).subscribe((resp: any) => {
        setTimeout(() => {
          this.dynamaicTableData = resp.data;
          console.log(this.dynamaicTableData)
          this.isNotLoader = true;
          this.isLoader = false;
        }, 600);
    });
  }

  editRecord(editId:number) {
    // this.router.navigateByUrl(`main/master/medical-add/${editId}`);
  }

  
}
