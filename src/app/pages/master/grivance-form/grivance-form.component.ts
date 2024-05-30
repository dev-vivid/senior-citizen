import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { MessageService } from 'primeng/api';
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
  selectedgrivenceType:any;
  selectedValue:any;
  filename: any;
  statusFormControl = new FormControl();
  selectedFile: any;
  constructor(public translationService: TranslationService,private fb: NonNullableFormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute
    ,private messageService: MessageService) { }

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
        issue: this.grivenceIndividualData.issue,
        issue_type: this.grivenceIndividualData.issue_type,
        file: this.grivenceIndividualData.file,
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
      status:[''],
      file:['']
    });
  }
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  onFileSelected(event: any) {
    const fileInput = event.target;
        this.selectedFile = fileInput.files?.[0];
        console.log("file", this.selectedFile)
        if (this.selectedFile) {
          // Extract filename and show it in the output
          this.filename = this.selectedFile.name;
      }
    }


  onSelectChange(event:any): void {
    this.selectedValue = event.value ;
    console.log('Selected Value: ', this.selectedValue);
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
    const formData: FormData = new FormData();
    formData.append('grievanceId', this.editMasterId.toString());
    formData.append('status', this.grivanceForm.value.status);
    formData.append('document', this.selectedFile);
    this.formService.addGrievance(formData).subscribe((resp: any) => {
      this.sharedService.showSuccess('Grievance Updated successfully!');
      this.grivanceForm.reset();
      console.log("upload grivence",this.sharedService);
      
      this.router.navigateByUrl(`main/master/grievance`);
    });
  }
}
