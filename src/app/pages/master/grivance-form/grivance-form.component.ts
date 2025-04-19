import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

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
        if (this.selectedFile) {
          this.filename = this.selectedFile.name;
      }
    }

    exportToExcel(): void {
      const data = [this.grivanceForm.value]; 
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      FileSaver.saveAs(blob, 'GrievanceData.xlsx');
    }
    printData(): void {
      const printContents = `
        <h3>Grievance Details</h3>
        <p><strong>Name:</strong> ${this.grivanceForm.value.name}</p>
        <p><strong>Address:</strong> ${this.grivanceForm.value.address}</p>
        <p><strong>Mobile:</strong> ${this.grivanceForm.value.mobile}</p>
        <p><strong>Age:</strong> ${this.grivanceForm.value.age}</p>
        <p><strong>Email:</strong> ${this.grivanceForm.value.email}</p>
        <p><strong>Issue:</strong> ${this.grivanceForm.value.issue}</p>
        <p><strong>Issue Type:</strong> ${this.grivanceForm.value.issue_type}</p>
      `;
      const win = window.open('', '_blank');
      win?.document.write(`<html><head><title>Print</title></head><body>${printContents}</body></html>`);
      win?.document.close();
      win?.print();
    }
  onSelectChange(event:any): void {
    this.selectedValue = event.value ;
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
  getGrivenceTypeList() {
    this.formService.getGrivenceTypeList().subscribe((resp: any) => {
      this.grivenceTypeList = resp.data;
      // console.log("Grvnce list", this.grivenceTypeList);
    });
  }
  addGrivence() {
    let value = {
      grievanceId: this.editMasterId,
    };
    let formData = new FormData();
    formData.append('grievanceId',value.grievanceId);
    formData.append('status',this.grivanceForm.value.status);
    if(this.selectedFile){
      formData.append('document', this.selectedFile);
    }
    this.formService.addGrievance(formData).subscribe((resp: any) => {
      this.sharedService.showSuccess('Grievance Updated successfully!');
      this.grivanceForm.reset();
      this.router.navigateByUrl(`main/master/grievance`);
    });
  }
}
