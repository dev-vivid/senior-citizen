import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-officer-type-add',
  templateUrl: './officer-type-add.component.html',
  styleUrls: ['./officer-type-add.component.scss']
})
export class OfficerTypeAddComponent implements OnInit {
  officerTypeForm!:UntypedFormGroup;
  resetData: any;
  editMasterId: any;
  editForm: any;
  isLoader: boolean;
  isNotLoader: boolean = true;
  Toggleactive: boolean = true;

  constructor(public translationService: TranslationService,private fb: NonNullableFormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.editMasterId = this.activatedRoute.snapshot.params['editId'];
    if(this.editMasterId > 0){
      this.editMasterForm();
    }
    this.initManufacturerForm();
  }
  
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  initManufacturerForm(){
    this.officerTypeForm = this.fb.group({
      // dictId: new FormControl<number>(0, { nonNullable: true }),
      name: new FormControl<string>('', [Validators.required])
    });
  }

  editMasterForm() {
    const dataKey = { officerTypeId: this.editMasterId };
    this.formService.officerTypeEdit(dataKey).subscribe((resp: any) => {
      this.editForm = resp.data;
      if (resp.statusCode == '200') {
        this.officerTypeForm.patchValue({
          name: this.editForm.name
        });
      }
    })
  }

  saveDetails() {
    if (this.officerTypeForm.valid) {
      this.isNotLoader = false;
      this.isLoader = true;
      if(this.editMasterId > 0){
        const name = this.officerTypeForm.value.name;
        const officerTypeId = this.editMasterId;
        const updateData = { officerTypeId, name }
        this.formService.officerTypeUpdate(updateData).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Updated successfully!');
            this.router.navigateByUrl(`main/master/officer-type`);
          }
        });
      } else {
        this.formService.addOfficerType(this.officerTypeForm.value).subscribe((data: any) => {
          if (data) {
            this.isNotLoader = true;
            this.isLoader = false;
            this.sharedService.showSuccess('Added successfully!');
            this.officerTypeForm.reset();
            this.router.navigateByUrl(`main/master/officer-type`);
          }
        });
      }
    } else {
      this.officerTypeForm.markAllAsTouched();
    }
  }
  
  reset() {
    this.officerTypeForm.reset();
    this.officerTypeForm.patchValue(this.resetData);
  }

}
