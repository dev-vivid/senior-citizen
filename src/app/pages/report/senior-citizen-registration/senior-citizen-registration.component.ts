import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-senior-citizen-registration',
  templateUrl: './senior-citizen-registration.component.html',
  styleUrls: ['./senior-citizen-registration.component.scss']
})
export class SeniorCitizenRegistrationComponent implements OnInit {
  @ViewChild('dt') dt: Table; // Reference to the table
  pipe = new DatePipe('en-US');
  searchReportForm!:UntypedFormGroup;
  dynamaicTableData: any;
  resetData: any;
  ksLoader: boolean = false;
  searchForm: boolean = true;
  isNotLoader:boolean = false;
  minToDate: Date;
  columns: any[] = [];
  data: any[] = [];
  globalFilterFields: string[] = [];

  constructor(public translationService: TranslationService,private fb: NonNullableFormBuilder, private formService: FormService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.initManufacturerForm();
  }
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  } 

  initManufacturerForm(){
    this.searchReportForm = this.fb.group({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      // isActive: new FormControl<boolean>(true, { nonNullable: true })
    });
  }
  updateToDateMinDate(event: Date) {
    this.minToDate = event;
  }
  saveDetails() {
    const startDate = this.pipe.transform(this.searchReportForm.value.fromDate, 'dd-MM-yyyy');
    const endDate = this.pipe.transform(this.searchReportForm.value.toDate, 'dd-MM-yyyy');
    const data = { startDate, endDate};
    if(this.searchReportForm.valid) {
      this.isNotLoader = false;
      this.searchForm = false;
      this.ksLoader = true;
        this.formService.postSeniorCitizenReport(data).subscribe((resp: any) => {
          this.columns = resp.data.cols;
          this.data = resp.data.values.map((item: any) => {
            // Replace null with 'N/A' or any other placeholder
            Object.keys(item).forEach(key => {
              if (item[key] === null) {
                item[key] = 'N/A';
              }
            });
            return item;
          });
          this.globalFilterFields = this.columns.map(col => col.field);
          this.dynamaicTableData = resp.fileUrl;
          // this.downloadFile();
          // console.log("Report data", this.dynamaicTableData)
        if (resp.statusCode == 200) {
          setTimeout(() => {
            this.ksLoader = false;
            this.isNotLoader = true;
            this.searchForm = true;
          }, 2400);
        } else {
          this.ksLoader = false;
          this.searchForm = true;
        }
      }, (err: Error) => {
        this.sharedService.showError('Problem occurred, Please try again');
      })
    }else{
      this.sharedService.showError('Search valid date range');
    }
  }

  downloadFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.dynamaicTableData);
    link.setAttribute('download', 'report.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  exportExcel(table: Table) {
    const data = table.filteredValue || table.value; // Use filtered data or full data if no filter
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, 'TableExport.xlsx');
}
applyGlobalFilter(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const filterValue = inputElement.value.trim().toLowerCase();
  this.dt.filterGlobal(filterValue, 'contains');
}
}
