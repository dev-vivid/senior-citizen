import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';


@Component({
  selector: 'app-old-age-type-add',
  templateUrl: './old-age-type-add.component.html',
  styleUrls: ['./old-age-type-add.component.scss']
})
export class OldAgeTypeAddComponent implements OnInit {
  editMasterId: any;
  oldageTypeForm!:UntypedFormGroup;
  resetData: any;
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
      if (this.oldageTypeForm) {
        this.oldageTypeForm.patchValue({ lang: this.currentLanguage });
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
    this.oldageTypeForm = this.fb.group({
      // dictId: new FormControl<number>(0, { nonNullable: true }),
      name: new FormControl<string>('', [Validators.required]),
      lang:this.currentLanguage
      // is_active: new FormControl<boolean>(true, { nonNullable: true })
    });
  }

  editMasterForm() {
    const dataKey = { oahTypeId: this.editMasterId,lang:this.oldageTypeForm.value.lang };
    this.formService.oahTypeEdit(dataKey).subscribe((resp: any) => {
      this.editForm = resp.data;
      if (resp.statusCode == '200') {
        this.oldageTypeForm.patchValue({
          name: this.editForm.name
        });
      }
    })
  }

  saveDetails() {
    if (this.oldageTypeForm.valid) {
      this.isNotLoader = false;
      this.isLoader = true;
      if(this.editMasterId > 0){
        const name = this.oldageTypeForm.value.name;
        const oahTypeId = this.editMasterId;
        const lang = this.oldageTypeForm.value.lang
        const updateData = { oahTypeId, name,lang }
        this.formService.oahTypeUpdate(updateData).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Updated successfully!');
            this.router.navigateByUrl(`/main/master/oldage-type`);
          }
        });
      } else {
        this.formService.addOldAgeType(this.oldageTypeForm.value).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Added successfully!');
            this.oldageTypeForm.reset();
            this.router.navigateByUrl(`/main/master/oldage-type`);
          }
        });
      }
    } else {
      this.oldageTypeForm.markAllAsTouched();
    }
  }

  reset() {
    this.oldageTypeForm.reset();
    this.oldageTypeForm.patchValue(this.resetData);
  }

}
