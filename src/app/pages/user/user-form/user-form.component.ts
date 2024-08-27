import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm :FormGroup;
  editMasterId: any;
  isLoader: boolean;
  hide = true;
  // editForm: any;
  isNotLoader: boolean = true;
  Toggleactive: boolean = true;
  dictList:any
  currentLanguage:any
  
  constructor(public translationService: TranslationService,private languageService: LanguageService,private fb: NonNullableFormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initManufacturerForm();
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
      console.log(this.currentLanguage)
      if (this.userForm) {
        this.userForm.patchValue({ lang: this.currentLanguage });
      }
    this.getDistrictList()
    });
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  initManufacturerForm(){
    this.userForm = this.fb.group({
      name:['', [Validators.required]],
      password:['', [Validators.required]],
      email:['', [Validators.required,Validators.email]],
      mobile:[''],
      districtId:['',Validators.required],
      lang:this.currentLanguage
    });
  }
  saveUser() {
    this.formService.addUser(this.userForm.value).subscribe({
      next: (data: any) => {
        if (data) {
          this.isNotLoader = true;
          this.isLoader = false;
          this.sharedService.showSuccess('Added successfully!');
          this.userForm.reset();
        }
      },
      error: (error: any) => {
        if (error.status === 409) { 
          this.sharedService.showError('User already exists!');
        } else {
          this.sharedService.showError('An error occurred. Please try again.');
        }
        this.isNotLoader = true;
        this.isLoader = false;
      }
    });
  }
  
  getDistrictList() {
    this.formService.getDistrictList(this.currentLanguage).subscribe((resp: any) => {
      this.dictList = resp.data;
    });
  }
}
