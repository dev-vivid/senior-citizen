import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-mobile-app-install',
  templateUrl: './mobile-app-install.component.html',
  styleUrls: ['./mobile-app-install.component.scss']
})
export class MobileAppInstallComponent implements OnInit {
  dynamaicTableData: any;
  submitted: boolean;
  isLoader: boolean;
  isNotLoader: boolean;
  currentLanguage:any
  cols: any[];
  @ViewChild('dt') dt!: Table; 
  constructor(public translationService: TranslationService,private confirmationService: ConfirmationService,private languageService: LanguageService,private formService: FormService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((language: string) => {
      this.currentLanguage = language;
      console.log(this.currentLanguage)
    this.getList();
    });
  }
  exportCSV() {
    if (this.dt) {
      this.dt.exportCSV();
    }
  }
   getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  } 
  getList() {
    this.isLoader = true;
    this.formService.getMobInstallList(this.currentLanguage).subscribe((resp: any) => {
      if (resp.status = 200) {
        this.dynamaicTableData = resp.data.values || [];
        this.cols = resp.data.cols || [];
        this.isNotLoader = true;
        this.isLoader = false;
    } else {
      this.sharedService.showError('Error');
    }
  },
  (error) => {
    this.sharedService.showError('Error');
  }
)};
exportToExcel() {
  if (!this.dynamaicTableData || this.dynamaicTableData.length === 0) {
    console.error("No data available to export");
    return;
  }

  // Create worksheet from JSON data
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dynamaicTableData);

  // Create workbook and append worksheet
  const workbook: XLSX.WorkBook = {
    Sheets: { 'Data': worksheet },
    SheetNames: ['Data']
  };

  // Generate Excel file and trigger download
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(data, 'ExportedData.xlsx');
}
onDelete(userId: number) {
  const payload = { userId: userId.toString() }; 
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete the record?',
    accept: () => {
        this.formService.deleteUser(payload).subscribe((resp: APIResponse) => {
            if (resp.statusCode == '200') {
              this.getList();
              this.sharedService.showSuccess('Record delete successfully');
            }
        })
    },
    reject: () => {
        this.sharedService.showWarn('Cancelled');
    }
});
}

}
