import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-officer-add',
  templateUrl: './officer-add.component.html',
  styleUrls: ['./officer-add.component.scss']
})
export class OfficerAddComponent implements OnInit {
  officerForm: FormGroup;
  resetData: any;
  dictList: any[];
  offTypeList: any[];
  editMasterId: any;
  editForm: any;
  isLoader: boolean;
  isNotLoader: boolean = true;
  Toggleactive: boolean = true;

  constructor(public translationService: TranslationService,private fb: FormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute) {
    this.officerForm = this.fb.group({
      officer_id: ['', Validators.required],
      district_id: ['', Validators.required],
      name: ['', Validators.required],
      contact: this.fb.array([]),
      fax: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
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
    this.getofficerTypeList();
  }

  
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
  
  editMasterForm() {
    const dataKey = { officerId: this.editMasterId };
    this.formService.officerEdit(dataKey).subscribe((resp: any) => {
      this.editForm = resp.data;
      if (resp.statusCode == '200') {
        this.officerForm.patchValue({
          officer_id: this.editForm.officer_id,
          district_id: this.editForm.district_id,
          name: this.editForm.name,
          contact: this.editForm.contact,
          fax: this.editForm.fax,
          email: this.editForm.email,
          address: this.editForm.address,
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
  // Add more
  get contactFormArr(): FormArray {
    return this.officerForm.get('contact') as FormArray;
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

  getDistrictList() {
    this.formService.getDistrictList().subscribe((resp: any) => {
      this.dictList = resp.data;
    });
  }

  getofficerTypeList() {
    this.formService.getofficerTypeList().subscribe((resp: any) => {
      this.offTypeList = resp.data;
    });
  }

  saveDetails() {
    if (this.officerForm.valid) {
      this.isNotLoader = false;
      this.isLoader = true;
      if(this.editMasterId > 0){
        const officerId = this.editMasterId;
        const officer_id = this.officerForm.value.officer_id;
        const district_id = this.officerForm.value.district_id;
        const name = this.officerForm.value.name;
        const contact = this.officerForm.value.contact;
        const fax = this.officerForm.value.fax;
        const email = this.officerForm.value.email;
        const address = this.officerForm.value.address;
        const updateData = { officerId, officer_id, district_id, name, contact, fax, email, address }
        this.formService.officerUpdate(updateData).subscribe((data: any) => {
          if (data) {
            setTimeout(() => {
              this.isNotLoader = true;
              this.isLoader = false;
              this.sharedService.showSuccess('Officer updated successfully!');
              this.router.navigate(['main/master/officer']);
            }, 600);
          }
        });
      }else{
        this.formService.addOfficer(this.officerForm.value).subscribe((data: any) => {
          if (data) {
            setTimeout(() => {
              this.isNotLoader = true;
              this.isLoader = false;
              this.sharedService.showSuccess('Officer added successfully!');
              this.officerForm.reset();
              this.router.navigate(['main/master/officer']);
            }, 600);
          }
        });
      }
    } else {
      this.officerForm.markAllAsTouched();
    }
  }
  
  reset() {
    this.officerForm.reset();
    this.officerForm.patchValue(this.resetData);
  }

}
