import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { ConfirmationService } from 'primeng/api';
import { APIResponse } from 'src/app/shared/models/api-response';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-officer-list',
  templateUrl: './officer-list.component.html',
  styleUrls: ['./officer-list.component.scss']
})
export class OfficerListComponent implements OnInit {
  searchForm!:UntypedFormGroup;
  dynamaicTableData: any;
  submitted: boolean;
  offTypeList: any[];
  isLoader: boolean;
  isNotLoader: boolean = true;

  constructor(private formService: FormService, private router: Router, private fb: NonNullableFormBuilder, private confirmationService: ConfirmationService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getInitList();
    this.getofficerTypeList();
    this.initManufacturerForm();
  }

  initManufacturerForm(){
    this.searchForm = this.fb.group({
      officer_id: new FormControl<string>(''),
    });
  }
  getofficerTypeList() {
    this.formService.getofficerTypeList().subscribe((resp: any) => {
      this.offTypeList = resp.data;
      this.offTypeList.unshift({id: '', name: 'All'})
    });
  }

  getInitList() {
    // this.isLoader = true;
    const reqData = {
      "OfficerId": ''
    }
    this.formService.getOfficerList(reqData).subscribe((resp: any) => {
        this.dynamaicTableData = resp.data;
        // this.isNotLoader = true;
        // this.isLoader = false;
    });
  }
  //Search load list
  searchDetails() {
    this.isLoader = true;
    this.isNotLoader = false;
    const reqData = {
      "OfficerId": this.searchForm.value.officer_id
    }
    this.formService.getOfficerList(reqData).subscribe((resp: any) => {
      setTimeout(() => {
        this.dynamaicTableData = resp.data;
        this.isNotLoader = true;
        this.isLoader = false;
      }, 600);
    });
  }

  deleteRecord(delId:number){
    const dataKey = { officerId: delId };
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the record?',
        accept: () => {
            this.formService.deleteofficer(dataKey).subscribe((resp: APIResponse) => {
                // console.log("datakey",dataKey);
                if (resp.statusCode == '200') {
                  this.getInitList();
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
    this.router.navigateByUrl(`main/master/officer-add/${editId}`);
  }

}
