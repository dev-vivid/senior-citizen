import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { ConfirmationService } from 'primeng/api';
import { APIResponse } from 'src/app/shared/models/api-response';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-medical-list',
  templateUrl: './medical-list.component.html',
  styleUrls: ['./medical-list.component.scss']
})
export class MedicalListComponent implements OnInit {
  searchForm!:UntypedFormGroup;
  dynamaicTableData: any;
  submitted: boolean;
  medicalTypeList: any[];
  isLoader: boolean;
  isNotLoader: boolean = true;


  constructor(private formService: FormService, private router: Router, private fb: NonNullableFormBuilder, private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getList();
    this.getAlrMedicalTypeList();
    this.initManufacturerForm();
  }

  getAlrMedicalTypeList() {
    this.formService.getAlrMedicalTypeList().subscribe((resp: any) => {
      this.medicalTypeList = resp.data;
      this.medicalTypeList.unshift({id: '', name: 'All'})
    });
  }
  initManufacturerForm(){
    this.searchForm = this.fb.group({
      medical_type_id: new FormControl<string>(''),
    });
  }
  getList() {
    // this.isLoader = true;
    const reqData = {
      "medicalId": ''
    }
    this.formService.getAlrMedicalList(reqData).subscribe((resp: any) => {
      if (resp.status = 200) {
        this.dynamaicTableData = resp.data;
        // console.log("get data", this.dynamaicTableData)
        // this.isNotLoader = true;
        // this.isLoader = false;
    }else {
      this.sharedService.showError('Error');
    }
  },
  (error) => {
    this.sharedService.showError('Error');
  }
)
  }
  //Search load list
  searchDetails() {
    this.isLoader = true;
    this.isNotLoader = false;
    const reqData = {
      "medicalId": this.searchForm.value.medical_type_id
    }
    this.formService.getAlrMedicalList(reqData).subscribe((resp: any) => {
        setTimeout(() => {
          this.dynamaicTableData = resp.data;
          this.isNotLoader = true;
          this.isLoader = false;
        }, 600);
    });
  }

  deleteRecord(medId:number){
    const dataKey = { medicalId: medId };
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the record?',
        accept: () => {
            this.formService.deleteAlrMedical(dataKey).subscribe((resp: APIResponse) => {
                // console.log("datakey",dataKey);
                if (resp.statusCode == '200') {
                  this.getList();
                  this.sharedService.showSuccess('Record delete successfully');
                }
            })
        },
        reject: () => {
            this.sharedService.showWarn('Cencelled');
        }
    });
  }

  editRecord(editId:number) {
    this.router.navigateByUrl(`main/master/medical-add/${editId}`);
  }
}
