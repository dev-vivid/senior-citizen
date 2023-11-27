import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-hospital-add',
  templateUrl: './hospital-add.component.html',
  styleUrls: ['./hospital-add.component.scss']
})
export class HospitalAddComponent implements OnInit {
  hospitalForm :FormGroup;
  dictList: any[];
  editMasterId: any;
  isLoader: boolean;
  editForm: any;
  isNotLoader: boolean = true;
  Toggleactive: boolean = true;
  currentLanguage:any

  constructor(private fb: FormBuilder, private formService: FormService, public translationService: TranslationService,
     private sharedService: SharedService, private activatedRoute: ActivatedRoute, private router: Router,
     private languageService: LanguageService,) {
    this.hospitalForm = this.fb.group({
      district_id: ['', Validators.required],
      name: ['', Validators.required],
      contact: this.fb.array([]),
      email: ['',Validators.required],
      address: ['', Validators.required],
      lang:this.currentLanguage
    });
  }

  ngOnInit(): void {
    this.editMasterId = this.activatedRoute.snapshot.params['editId'];
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
      console.log(this.currentLanguage)
      if (this.hospitalForm) {
        this.hospitalForm.patchValue({ lang: this.currentLanguage });
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
    return this.hospitalForm.get('contact') as FormArray;
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
    const dataKey = { hospitalId: this.editMasterId,lang:this.hospitalForm.value.lang };
    this.formService.hospitalEdit(dataKey).subscribe((resp: any) => {
      this.editForm = resp.data;
      console.log("this.editForm", this.editForm)
      if (resp.statusCode == '200') {
        this.hospitalForm.patchValue({
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

  getDistrictList() {
    this.formService.getDistrictList(this.currentLanguage).subscribe((resp: any) => {
      this.dictList = resp.data;
    });
  }

  saveDetails() {
    if (this.hospitalForm.valid) {
      this.isNotLoader = false;
      this.isLoader = true;
      if(this.editMasterId > 0){
        const hospitalId = this.editMasterId;
        const district_id = this.hospitalForm.value.district_id;
        const name = this.hospitalForm.value.name;
        const contact = this.hospitalForm.value.contact;
        const email = this.hospitalForm.value.email;
        const address = this.hospitalForm.value.address;
        const lang = this.hospitalForm.value.lang 
        const updateData = { hospitalId, district_id, name, contact, email, address,lang }
        this.formService.hospitalUpdate(updateData).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Updated successfully!');
            this.router.navigateByUrl(`main/master/hospital`);
          }
        });
      } else {
        this.formService.addHospital(this.hospitalForm.value).subscribe((data: any) => {
          if (data) {
            setTimeout(() => {
              this.isNotLoader = true;
              this.isLoader = false;
              this.sharedService.showSuccess('Hospital added successfully!');
              this.hospitalForm.reset();
              this.router.navigate(['main/master/hospital']);
            }, 600);
          }
        });
      }
    } else {
      this.hospitalForm.markAllAsTouched();
    }
  }

}
