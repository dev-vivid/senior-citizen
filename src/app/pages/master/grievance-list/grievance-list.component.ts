import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-grievance-list',
  templateUrl: './grievance-list.component.html',
  styleUrls: ['./grievance-list.component.scss']
})
export class GrievanceListComponent implements OnInit {
  searchForm!:UntypedFormGroup;
  searchHeader: any[] = ['name'];
  loading: boolean;
  dynamaicTableData: any;
  grivenceTypeList:any
  isLoader: boolean;
  isNotLoader: boolean = true;
  grivenceType:''

  constructor( private router: Router,private formService: FormService, private fb: NonNullableFormBuilder, private sharedService: SharedService,
    public translationService: TranslationService
    ) { }

  ngOnInit(): void {
    this.getGrivenceTypeList();
    this.getList();
    this.initManufacturerForm()
  }
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }


  getGrivenceTypeList() {
    this.formService.getGrivenceTypeList().subscribe((resp: any) => {
      this.grivenceTypeList = resp.data;
      // this.grivenceTypeList.unshift({id: '', name: 'All'})
    });
  }
  initManufacturerForm(){
    this.searchForm = this.fb.group({
      grivenceId_type_Id: new FormControl<string>(''),
    });
  }
  viewGrivenance(rowdata:any){
    const griveanceId = rowdata.id
    this.router.navigateByUrl(`main/master/grievance-form/${griveanceId}`);
  }
  getList() {
    // this.isLoader = true;
    const reqData = {
      "grievanceStatus": "1"
    }
    console.log(reqData);
    this.formService.getGrivanceList(reqData).subscribe((resp: any) => {
      if (resp.status = 200) {
        this.dynamaicTableData = resp.data;
        console.log("get data", this.dynamaicTableData)
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
    const reqData = {
      "grievanceStatus": this.searchForm.value.grivenceId_type_Id
    }
    this.formService.getGrivanceList(reqData).subscribe((resp: any) => {
        setTimeout(() => {
          this.dynamaicTableData = resp.data;
          console.log(this.dynamaicTableData)
          this.isNotLoader = true;
          this.isLoader = false;
        }, 600);
    });
  }

  editRecord(editId:number) {
    // this.router.navigateByUrl(`main/master/medical-add/${editId}`);
  }

  
}
