import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-grivance-form',
  templateUrl: './grivance-form.component.html',
  styleUrls: ['./grivance-form.component.scss']
})
export class GrivanceFormComponent implements OnInit {
  grivanceForm!:UntypedFormGroup;
  editMasterId:any
  grivenceIndividualData:any
  grivenceTypeList:any
  constructor(public translationService: TranslationService,private fb: NonNullableFormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initManufacturerForm()
    this.editMasterId = this.activatedRoute.snapshot.params['griveanceId'];
    let dataId = {
      grievanceId:this.editMasterId
    }
    this.formService.getGrivenanceIndividual(dataId).subscribe((resp: any) => {
      this.grivenceIndividualData = resp.data;
      this.grivanceForm.patchValue({
        name: this.grivenceIndividualData.name,
        address: this.grivenceIndividualData.address,
        mobile: this.grivenceIndividualData.mobile,
        age: this.grivenceIndividualData.age,
        email: this.grivenceIndividualData.email,
        issue: this.grivenceIndividualData.name,
        issue_type: this.grivenceIndividualData.issue_type,
      });
    });
    this.getGrivenceTypeList()
  }
  initManufacturerForm(){
    this.grivanceForm = this.fb.group({
      name: [''],
      address: [''],
      mobile: [''],
      age: [''],
      email: [''],
      issue: [''],
      issue_type: [''],
      status:['']
    });
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
  getGrivenceTypeList() {
    this.formService.getGrivenceTypeList().subscribe((resp: any) => {
      this.grivenceTypeList = resp.data;
    });
  }
  addGrivence(){
    let value ={
      grievanceId:this.editMasterId,
      status:this.grivanceForm.value.status
    }
    this.formService.addGrievance(value).subscribe((resp: any) => {
      this.sharedService.showSuccess('Grievance Updated successfully!');
      this.grivanceForm.reset();
      this.router.navigateByUrl(`main/master/grievance`);
    });
  }
}
