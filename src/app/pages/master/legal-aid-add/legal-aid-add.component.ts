import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-legal-aid-add',
  templateUrl: './legal-aid-add.component.html',
  styleUrls: ['./legal-aid-add.component.scss']
})
export class LegalAidAddComponent implements OnInit {
  legalAidForm: FormGroup;
  resetData: any;
  editMasterId: any;
  dictList: any[];
  oahType: any[];
  editForm: any;
  isLoader: boolean;
  isNotLoader: boolean = true;
  Toggleactive: boolean = true;

  constructor(private fb: FormBuilder, private formService: FormService, private router: Router,public translationService: TranslationService,
     private sharedService: SharedService, private activatedRoute: ActivatedRoute) {
    this.legalAidForm = this.fb.group({
      district_id:  ['', Validators.required],
      name:  ['', Validators.required],
      contact: this.fb.array([]),
      email:  ['', Validators.required],
      address:  ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.editMasterId = this.activatedRoute.snapshot.params['editId'];
    if(this.editMasterId > 0){
      this.editMasterForm();
    }else{
      this.addContact();
    }
    this.getDistrictList();
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  // Add more
  get contactFormArr(): FormArray {
    return this.legalAidForm.get('contact') as FormArray;
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
    const dataKey = { LegalAidId: this.editMasterId };
    this.formService.LegalAidEdit(dataKey).subscribe((resp: any) => {
      this.editForm = resp.data;
      // console.log("this.editForm", this.editForm)
      if (resp.statusCode == '200') {
        this.legalAidForm.patchValue({
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
    if (this.legalAidForm.valid) {
      this.isNotLoader = false;
      this.isLoader = true;
      if(this.editMasterId > 0){
        const LegalAidId = this.editMasterId;
        const district_id = this.legalAidForm.value.district_id;
        const name = this.legalAidForm.value.name;
        const contact = this.legalAidForm.value.contact;
        const email = this.legalAidForm.value.email;
        const address = this.legalAidForm.value.address;
        const updateData = { LegalAidId, district_id, name, contact, email, address }
        this.formService.LegalAidUpdate(updateData).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Updated successfully!');
            this.router.navigateByUrl(`main/master/legal-aid`);
          }
        });
      } else {
        this.formService.addLegalAid(this.legalAidForm.value).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Added successfully!');
            this.legalAidForm.reset();
            this.router.navigateByUrl(`main/master/legal-aid`);
          }
        });
      }
    } else {
      this.legalAidForm.markAllAsTouched();
    }
  }

  getDistrictList() {
    this.formService.getDistrictList().subscribe((resp: any) => {
      this.dictList = resp.data;
    });
  }
  
  reset() {
    this.legalAidForm.reset();
    this.legalAidForm.patchValue(this.resetData);
  }

}
