import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-old-age-add',
  templateUrl: './old-age-add.component.html',
  styleUrls: ['./old-age-add.component.scss']
})
export class OldAgeAddComponent implements OnInit {
  oldageForm: FormGroup;
  resetData: any;
  editMasterId: any;
  dictList: any[];
  oahType: any[];
  editForm: any;
  isLoader: boolean;
  isNotLoader: boolean = true;
  Toggleactive: boolean = true;
  currentLanguage:any

  constructor(public translationService: TranslationService,private fb: FormBuilder,private languageService: LanguageService,
     private formService: FormService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute) {
    this.oldageForm = this.fb.group({
      oah_type:  ['', Validators.required],
      district_id:  ['', Validators.required],
      name:  ['', Validators.required],
      contact: this.fb.array([]),
      email:  ['', Validators.required],
      address:  ['', Validators.required],
      lang:this.currentLanguage
    });
  }

  ngOnInit(): void {
    this.editMasterId = this.activatedRoute.snapshot.params['editId'];
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
      console.log(this.currentLanguage)
      if (this.oldageForm) {
        this.oldageForm.patchValue({lang: this.currentLanguage});
      }
    this.getDistrictList();
    this.getoahTypeList();
    });
    if(this.editMasterId > 0){
      this.editMasterForm();
    }else{
      this.addContact();
    }
  }
  
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  // Add more
  get contactFormArr(): FormArray {
    return this.oldageForm.get('contact') as FormArray;
  }
  addContact() {
    this.contactFormArr.push(
      this.fb.group({
        contact: ['', Validators.required]
      })
    );
  }
  removeContact(index) {
    this.contactFormArr.removeAt(index);
  }
  // add more end

  editMasterForm() {
    const dataKey = { oahId: this.editMasterId,lang:this.oldageForm.value.lang };
    this.formService.oahEdit(dataKey).subscribe((resp: any) => {
      this.editForm = resp.data;
      console.log("this.editForm", this.editForm)
      if (resp.statusCode == '200') {
        this.oldageForm.patchValue({
          oah_type: this.editForm.oah_type,
          district_id: this.editForm.district_id,
          name: this.editForm.name,
          // contact: this.editForm.contact,
          email: this.editForm.email,
          address: this.editForm.address
        });
        
        this.editForm.contact.forEach(element => {
          this.contactFormArr.push(
              this.fb.group({
                  contact:[element.contact]
              })
          );
        });
        
        // this.oldageForm.setControl('contact', this.fb.array(this.editForm.contact || []));
      }
    })
  }

  saveDetails() {
    if (this.oldageForm.valid) {
      this.isNotLoader = false;
      this.isLoader = true;
      if(this.editMasterId > 0){
        const oahId = this.editMasterId;
        const oah_type = this.oldageForm.value.oah_type;
        const district_id = this.oldageForm.value.district_id;
        const name = this.oldageForm.value.name;
        const contact = this.oldageForm.value.contact;
        const email = this.oldageForm.value.email;
        const address = this.oldageForm.value.address;
        const lang = this.oldageForm.value.lang
        const updateData = { oahId, oah_type, district_id, name, contact, email, address,lang }
        this.formService.oahUpdate(updateData).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Updated successfully!');
            this.router.navigateByUrl(`main/master/oldage`);
          }
        });
      } else {
        this.formService.addOldAge(this.oldageForm.value).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Added successfully!');
            this.oldageForm.reset();
            this.router.navigateByUrl(`main/master/oldage`);
          }
        });
      }
    } else {
      this.oldageForm.markAllAsTouched();
    }
  }

  getDistrictList() {
    this.formService.getDistrictList(this.currentLanguage).subscribe((resp: any) => {
      this.dictList = resp.data;
    });
  }

  getoahTypeList() {
    this.formService.getoahTypeList(this.currentLanguage).subscribe((resp: any) => {
      this.oahType = resp.data;
      //console.log("getoahTypeList", this.oahType)
    });
  }
  
  reset() {
    this.oldageForm.reset();
    this.oldageForm.patchValue(this.resetData);
  }

}
