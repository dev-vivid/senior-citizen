import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-district-add',
  templateUrl: './district-add.component.html',
  styleUrls: ['./district-add.component.scss']
})
export class DistrictAddComponent implements OnInit {
  districtForm!:UntypedFormGroup;
  resetData: any;
  editMasterId: any;
  formData: any;
  editForm: any;
  isLoader: boolean;
  isNotLoader: boolean = true;
  Toggleactive: boolean = true;

  constructor(private fb: NonNullableFormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.editMasterId = this.activatedRoute.snapshot.params['editId'];
    this.initManufacturerForm();
    if(this.editMasterId > 0){
      this.editMasterForm();
    }
  }

  initManufacturerForm(){
    this.districtForm = this.fb.group({
      name: new FormControl<string>('', [Validators.required]),
      // is_active: new FormControl<boolean>(true, { nonNullable: true })
    });
  }

  editMasterForm() {
    const dataKey = { districtId: this.editMasterId };
    this.formService.districtEdit(dataKey).subscribe((resp: any) => {
      this.editForm = resp.data;
      if (resp.statusCode == '200') {
        this.districtForm.patchValue({
          name: this.editForm.name
        });
      }
    })
  }

  saveDistrictDetails() {
    if (this.districtForm.valid) {
      this.isNotLoader = false;
      this.isLoader = true;
      if(this.editMasterId > 0){
        const name = this.districtForm.value.name;
        const districtId = this.editMasterId;
        const updateData = { districtId, name }
        this.formService.districtUpdate(updateData).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('District updated successfully!');
            this.router.navigateByUrl(`main/master/district`);
          }
        });
      }else{
        this.formService.addDistrict(this.districtForm.value).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('District added successfully!');
            this.districtForm.reset();
            this.router.navigateByUrl(`main/master/district`);
          }
        });
      }
    } else {
      this.districtForm.markAllAsTouched();
    }
  }
  
  reset() {
    this.districtForm.reset();
    this.districtForm.patchValue(this.resetData);
  }

}
