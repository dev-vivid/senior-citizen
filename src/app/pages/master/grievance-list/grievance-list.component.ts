import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup } from '@angular/forms';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-grievance-list',
  templateUrl: './grievance-list.component.html',
  styleUrls: ['./grievance-list.component.scss']
})
export class GrievanceListComponent implements OnInit {
  searchForm!:UntypedFormGroup;

  dynamaicTableData: any;
  grivenceTypeList:any
  isLoader: boolean;
  isNotLoader: boolean = true;
  grivenceType:''

  constructor(private formService: FormService, private fb: NonNullableFormBuilder, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getGrivenceTypeList();
    this.getList();
    this.initManufacturerForm()
  }

  getGrivenceTypeList() {
    this.formService.getGrivenceTypeList().subscribe((resp: any) => {
      console.log(resp.data)
      this.grivenceTypeList = resp.data;
      this.grivenceTypeList.unshift({id: '', name: 'All'})
    });
  }
  initManufacturerForm(){
    this.searchForm = this.fb.group({
      grivenceId_type_Id: new FormControl<string>(''),
    });
  }
  getList() {
    // this.isLoader = true;
    const reqData = {
      "grievanceStatus": ''
    }
    console.log(reqData);
    this.formService.getGrivanceList(reqData).subscribe((resp: any) => {
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
  searchDetails() {
    this.isLoader = true;
    this.isNotLoader = false;
    console.log('MedicalId',this.searchForm.value.grivenceId_type_Id)
    const reqData = {
      "grievanceStatus": this.searchForm.value.grivenceId_type_Id
    }
    this.formService.getGrivanceList(reqData).subscribe((resp: any) => {
        setTimeout(() => {
          this.dynamaicTableData = resp.data;
          this.isNotLoader = true;
          this.isLoader = false;
        }, 600);
    });
  }

  editRecord(editId:number) {
    // this.router.navigateByUrl(`main/master/medical-add/${editId}`);
  }

  
}
