import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-medical-add',
  templateUrl: './medical-add.component.html',
  styleUrls: ['./medical-add.component.scss']
})
export class MedicalAddComponent implements OnInit {
  medicalForm!:UntypedFormGroup;
  resetData: any;
  editMasterId: any;
  formData: any;
  editForm: any;
  dictList: any[];
  medicalTypeList: any[];
  isLoader: boolean;
  isNotLoader: boolean = true;
  Toggleactive: boolean = true;

  constructor(private fb: NonNullableFormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute) {
    this.medicalForm = this.fb.group({
      medical_type_id: ['', Validators.required],
      district_id: ['', Validators.required],
      name: ['', Validators.required],
      contact: this.fb.array([]),
      email: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAlrMedicalTypeList();
    this.getDistrictList();
    this.editMasterId = this.activatedRoute.snapshot.params['editId'];
    // this.initManufacturerForm();
    if(this.editMasterId > 0){
      this.editMasterForm();
    }else{
      this.addContact();
    }
  }
  // dd
  getDistrictList() {
    this.formService.getDistrictList().subscribe((resp: any) => {
      this.dictList = resp.data;
    });
  }
  getAlrMedicalTypeList() {
    this.formService.getAlrMedicalTypeList().subscribe((resp: any) => {
      this.medicalTypeList = resp.data;
    });
  }

  editMasterForm() {
    const dataKey = { medicalId: this.editMasterId };
    this.formService.AlrMedicalEdit(dataKey).subscribe((resp: any) => {
      this.editForm = resp.data;
      if (resp.statusCode == '200') {
        this.medicalForm.patchValue({
          medical_type_id: this.editForm.medical_type_id,
          district_id: this.editForm.district_id,
          name: this.editForm.name,
          contact: this.editForm.contact,
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
    return this.medicalForm.get('contact') as FormArray;
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

  saveMedicalDetails() {
    if (this.medicalForm.valid) {
      this.isNotLoader = false;
      this.isLoader = true;
      if(this.editMasterId > 0){
        const medicalId = this.editMasterId;
        const medical_type_id = this.medicalForm.value.medical_type_id;
        const district_id = this.medicalForm.value.district_id;
        const name = this.medicalForm.value.name;
        const contact = this.medicalForm.value.contact;
        const email = this.medicalForm.value.email;
        const address = this.medicalForm.value.address;
        const updateData = { medicalId, medical_type_id, district_id, name, contact, email, address }
        this.formService.AlrMedicalUpdate(updateData).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Updated successfully!');
            this.router.navigateByUrl(`main/master/medical`);
          }
        });
      }else{
        this.formService.addAlrMedical(this.medicalForm.value).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Added successfully!');
            this.medicalForm.reset();
            this.router.navigateByUrl(`main/master/medical`);
          }
        });
      }
    } else {
      this.medicalForm.markAllAsTouched();
    }
  }
  
  reset() {
    this.medicalForm.reset();
    this.medicalForm.patchValue(this.resetData);
  }

}
