import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-officer-type-add',
  templateUrl: './officer-type-add.component.html',
  styleUrls: ['./officer-type-add.component.scss']
})
export class OfficerTypeAddComponent implements OnInit {
  officerTypeForm!:UntypedFormGroup;
  resetData: any;
  editMasterId: any;
  editForm: any;
  isLoader: boolean;
  isNotLoader: boolean = true;
  Toggleactive: boolean = true;
  currentLanguage:any

  constructor(public translationService: TranslationService,private fb: NonNullableFormBuilder,private languageService: LanguageService,
     private formService: FormService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initManufacturerForm();
    this.editMasterId = this.activatedRoute.snapshot.params['editId'];
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
      console.log(this.currentLanguage)
      if (this.officerTypeForm) {
        this.officerTypeForm.patchValue({ lang: this.currentLanguage });
      }
    });
    if(this.editMasterId > 0){
      this.editMasterForm();
    }
  }
  
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  initManufacturerForm(){
    this.officerTypeForm = this.fb.group({
      // dictId: new FormControl<number>(0, { nonNullable: true }),
      name: new FormControl<string>('', [Validators.required]),
      lang:this.currentLanguage
    });
  }

  editMasterForm() {
    const dataKey = { officerTypeId: this.editMasterId,lang:this.officerTypeForm.value.lang };
    this.formService.officerTypeEdit(dataKey).subscribe((resp: any) => {
      this.editForm = resp.data;
      if (resp.statusCode == '200') {
        this.officerTypeForm.patchValue({
          name: this.editForm.name
        });
      }
    })
  }

  saveDetails() {
    if (this.officerTypeForm.valid) {
      this.isNotLoader = false;
      this.isLoader = true;
      if(this.editMasterId > 0){
        const name = this.officerTypeForm.value.name;
        const officerTypeId = this.editMasterId;
        const lang = this.officerTypeForm.value.lang
        const updateData = { officerTypeId, name ,lang}
        this.formService.officerTypeUpdate(updateData).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Updated successfully!');
            this.router.navigateByUrl(`main/master/officer-type`);
          }
        });
      } else {
        this.formService.addOfficerType(this.officerTypeForm.value).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Added successfully!');
            this.officerTypeForm.reset();
            this.router.navigateByUrl(`main/master/officer-type`);
          }
        });
      }
    } else {
      this.officerTypeForm.markAllAsTouched();
    }
  }
  
  reset() {
    this.officerTypeForm.reset();
    this.officerTypeForm.patchValue(this.resetData);
  }

}
