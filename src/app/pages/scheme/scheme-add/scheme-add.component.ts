import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Interface } from 'readline';
import { FormService } from 'src/app/shared/services/form.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-scheme-add',
  templateUrl: './scheme-add.component.html',
  styleUrls: ['./scheme-add.component.scss']
})
export class SchemeAddComponent implements OnInit {
  schemeForm!:UntypedFormGroup;
  resetData: any;
  //fileupload
  preview: any;
  primaryImage: any;
  isLoader: boolean;
  editMasterId: any;
  isNotLoader: boolean = true;
  Toggleactive: boolean = true;
  editForm: any;
  imagePath: any;
  currentLanguage:any

  constructor(public translationService: TranslationService,private fb: NonNullableFormBuilder,private languageService: LanguageService, private formService: FormService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initManufacturerForm();
    this.editMasterId = this.activatedRoute.snapshot.params['editId'];
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
      console.log(this.currentLanguage)
      if (this.schemeForm) {
        this.schemeForm.patchValue({ lang: this.currentLanguage });
      }
    });
    if(this.editMasterId > 0){
      this.editMasterForm();
    }
  }
  validateKeyPress(event: KeyboardEvent): boolean {
    const charCode = event.charCode;
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || 
        (charCode >= 48 && charCode <= 57) || charCode === 32 || charCode <= 31) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  } 

  initManufacturerForm(){
    this.schemeForm = this.fb.group({
      government: new FormControl<string>('', [Validators.required]),
      scheme_name: new FormControl<string>('', [Validators.required]),
      scheme_objective: new FormControl<string>('', [Validators.required]),
      scheme_eligibility: new FormControl<string>('', [Validators.required]),
      fileUpload: new FormControl(''),
      lang:this.currentLanguage
      // fileSource: new FormControl('')
    });
  }

  editMasterForm() {
    const dataKey = { schemeId: this.editMasterId,lang:this.schemeForm.value.lang };
    this.formService.schemeEdit(dataKey).subscribe((resp: any) => {
      this.editForm = resp.data;
      // console.log("Edit form", this.editForm);
      if (resp.statusCode == '200') {
        this.schemeForm.patchValue({
          government: this.editForm.government,
          scheme_name: this.editForm.scheme_name,
          scheme_objective: this.editForm.scheme_objective,
          scheme_eligibility: this.editForm.scheme_eligibility,
        });
        this.imagePath = this.editForm.document;
      }
    })
  }

  onFileChange(event) {
    // if (event.target.files.length > 0) {
    //   const fileUpload = event.target.files[0];
    //   this.schemeForm.patchValue({
    //     fileSource: fileUpload
    //   });
    // }
    const documentDetail = new DocumentDetail();
    documentDetail.fileName = event.target.files[0].name;
    documentDetail.document = event.target.files[0];
    this.primaryImage = documentDetail;
  }

  saveSchemeDetails() {
    if (this.schemeForm.valid) {
      this.isNotLoader = false;
      this.isLoader = true;
      if(this.editMasterId > 0){
        const formData = new FormData();
        formData.append('name', this.schemeForm.value.scheme_name);
        formData.append('objectiveScheme', this.schemeForm.value.scheme_objective);
        formData.append('eligiblePersons', this.schemeForm.value.scheme_eligibility);
        formData.append('government', this.schemeForm.value.government);
        // formData.append('document', this.primaryImage.document);
        formData.append('schemeId', this.editMasterId);
        formData.append('lang',this.schemeForm.value.lang)
        this.formService.schemeUpdate(formData).subscribe((resp: any) => {
          if (resp.statusCode == 200) {
            setTimeout(() => {
              this.isNotLoader = true;
              this.isLoader = false;
              this.sharedService.showSuccess("Scheme updated successfully!..");
              this.router.navigate(['main/scheme']);
              this.schemeForm.reset();
            }, 600);
          } else {
            this.sharedService.showInfo(resp.message);
          }
        });
      }else{
        // console.log("ADD ");
        const formData = new FormData();
        formData.append('name', this.schemeForm.value.scheme_name);
        formData.append('objectiveScheme', this.schemeForm.value.scheme_objective);
        formData.append('eligiblePersons', this.schemeForm.value.scheme_eligibility);
        formData.append('government', this.schemeForm.value.government);
        formData.append('document', this.primaryImage.document);
        this.formService.addScheme(formData).subscribe((resp: any) => {
          if (resp.statusCode == 200) {
            setTimeout(() => {
              this.isNotLoader = true;
              this.isLoader = false;
              this.sharedService.showSuccess("Scheme added successfully!..");
              this.router.navigate(['main/scheme']);
              this.schemeForm.reset();
            }, 600);
          } else {
            this.sharedService.showInfo(resp.message);
          }
        });
      }
    }else {
      this.schemeForm.markAllAsTouched();
    }
  }
  
  reset() {
    this.schemeForm.reset();
    this.schemeForm.patchValue(this.resetData);
  }

}

export class DocumentDetail {
  fileName: string = '';
  document: any;
  filePath: string = '';
}