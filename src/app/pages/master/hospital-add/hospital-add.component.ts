import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

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

  constructor(private fb: FormBuilder, private formService: FormService, private sharedService: SharedService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.hospitalForm = this.fb.group({
      district_id: ['', Validators.required],
      name: ['', Validators.required],
      contact: this.fb.array([]),
      email: ['', Validators.required],
      address: ['', Validators.required]
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
    const dataKey = { hospitalId: this.editMasterId };
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
    this.formService.getDistrictList().subscribe((resp: any) => {
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
        const updateData = { hospitalId, district_id, name, contact, email, address }
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
