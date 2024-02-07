import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-senior-citizen-registration',
  templateUrl: './senior-citizen-registration.component.html',
  styleUrls: ['./senior-citizen-registration.component.scss']
})
export class SeniorCitizenRegistrationComponent implements OnInit {
  pipe = new DatePipe('en-US');
  searchReportForm!:UntypedFormGroup;
  dynamaicTableData: any;
  resetData: any;
  ksLoader: boolean = false;
  searchForm: boolean = true;
  isNotLoader:boolean = false;

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

  saveDetails() {
    const startDate = this.pipe.transform(this.searchReportForm.value.fromDate, 'dd-MM-yyyy');
    const endDate = this.pipe.transform(this.searchReportForm.value.toDate, 'dd-MM-yyyy');
    const data = { startDate, endDate};
    if(this.searchReportForm.valid) {
      this.isNotLoader = false;
      this.searchForm = false;
      this.ksLoader = true;
      this.formService.postSeniorCitizenReport(data).subscribe((resp: any) => {
        this.dynamaicTableData = resp.fileUrl;
        this.downloadFile();
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

}
