import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-medical-type-add',
  templateUrl: './medical-type-add.component.html',
  styleUrls: ['./medical-type-add.component.scss']
})
export class MedicalTypeAddComponent implements OnInit {
  medicalTypeForm!:UntypedFormGroup;
  resetData: any;
  editMasterId: any;
  formData: any;
  editForm: any;
  isLoader: boolean;
  isNotLoader: boolean = true;
  Toggleactive: boolean = true;
   selectedFile: File | null = null;
  selectedFilePreview: string | ArrayBuffer | null = null;

  constructor(private fb: NonNullableFormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.editMasterId = this.activatedRoute.snapshot.params['editId'];
    this.initManufacturerForm();
    if(this.editMasterId > 0){
      this.editMasterForm();
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.previewSelectedImage();
  }

  previewSelectedImage() {
    if (!this.selectedFile) {
      this.selectedFilePreview = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedFilePreview = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  initManufacturerForm(){
    this.medicalTypeForm = this.fb.group({
      name: new FormControl<string>('', [Validators.required]),
      // is_active: new FormControl<boolean>(true, { nonNullable: true })
    });
  }

  editMasterForm() {
    const dataKey = { medicalTypeId: this.editMasterId };
    this.formService.AlrMedicalTypeEdit(dataKey).subscribe((resp: any) => {
      this.editForm = resp.data;
      if (resp.statusCode == '200') {
        this.medicalTypeForm.patchValue({
          name: this.editForm.name
        });
      }
    })
  }

  saveMedicalDetails() {
    if (this.medicalTypeForm.valid) {
      this.isNotLoader = false;
      this.isLoader = true;
      if(this.editMasterId > 0){
        const name = this.medicalTypeForm.value.name;
        const medicalTypeId = this.editMasterId;
        const updateData = { medicalTypeId, name }
        this.formService.alrMedicalTypeUpdate(updateData).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Updated successfully!');
            this.router.navigateByUrl(`main/master/medical-type`);
          }
        });
      }else{
        this.formService.addAlrMedicalType(this.medicalTypeForm.value).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Added successfully!');
            this.medicalTypeForm.reset();
            this.router.navigateByUrl(`main/master/medical-type`);
          }
        });
      }
    } else {
      this.medicalTypeForm.markAllAsTouched();
    }
  }
  
  reset() {
    this.medicalTypeForm.reset();
    this.medicalTypeForm.patchValue(this.resetData);
  }

}
