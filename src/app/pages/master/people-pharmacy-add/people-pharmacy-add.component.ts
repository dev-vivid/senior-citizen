import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-people-pharmacy-add',
  templateUrl: './people-pharmacy-add.component.html',
  styleUrls: ['./people-pharmacy-add.component.scss']
})
export class PeoplePharmacyAddComponent implements OnInit {
  ppharmacyForm: FormGroup;
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
    this.ppharmacyForm = this.fb.group({
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
      if (this.ppharmacyForm) {
        this.ppharmacyForm.patchValue({ lang: this.currentLanguage });
      }
    this.getDistrictList();
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
    return this.ppharmacyForm.get('contact') as FormArray;
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
    const dataKey = { peoplePharmacyId: this.editMasterId,lang:this.ppharmacyForm.value.lang };
    this.formService.PeoplePharmacyEdit(dataKey).subscribe((resp: any) => {
      this.editForm = resp.data;
      // console.log("this.editForm", this.editForm)
      if (resp.statusCode == '200') {
        this.ppharmacyForm.patchValue({
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
    
      }
    })
  }

  saveDetails() {
    if (this.ppharmacyForm.valid) {
      this.isNotLoader = false;
      this.isLoader = true;
      if(this.editMasterId > 0){
        const peoplePharmacyId = this.editMasterId;
        const district_id = this.ppharmacyForm.value.district_id;
        const name = this.ppharmacyForm.value.name;
        const contact = this.ppharmacyForm.value.contact;
        const email = this.ppharmacyForm.value.email;
        const address = this.ppharmacyForm.value.address;
        const lang = this.ppharmacyForm.value.lang
        const updateData = { peoplePharmacyId, district_id, name, contact, email, address,lang }
        this.formService.PeoplePharmacyUpdate(updateData).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Updated successfully!');
            this.router.navigateByUrl(`main/master/people-pharmacy`);
          }
        });
      } else {
        this.formService.addPeoplePharmacy(this.ppharmacyForm.value).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Added successfully!');
            this.ppharmacyForm.reset();
            this.router.navigateByUrl(`main/master/people-pharmacy`);
          }
        });
      }
    } else {
      this.ppharmacyForm.markAllAsTouched();
    }
  }

  getDistrictList() {
    this.formService.getDistrictList(this.currentLanguage).subscribe((resp: any) => {
      this.dictList = resp.data;
    });
  }
  
  reset() {
    this.ppharmacyForm.reset();
    this.ppharmacyForm.patchValue(this.resetData);
  }

}
