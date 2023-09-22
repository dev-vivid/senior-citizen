import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { APIResponse } from 'src/app/shared/models/api-response';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-scheme-list',
  templateUrl: './scheme-list.component.html',
  styleUrls: ['./scheme-list.component.scss']
})
export class SchemeListComponent implements OnInit {
  dynamaicTableData: any;
  submitted: boolean;
  isLoader: boolean;
  isNotLoader: boolean;

  constructor(private formService: FormService, private router: Router, private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.isLoader = true;
    this.formService.getSchemeList().subscribe((resp: any) => {
      if (resp.status = 200) {
        this.dynamaicTableData = resp.data;
        this.isNotLoader = true;
        this.isLoader = false;
        
    } else {
      this.sharedService.showError('Error');
    }
  },
  (error) => {
    this.sharedService.showError('Error');
  }
)
};

  deleteRecord(scheId:number){
    const dataKey = { schemeId: scheId };
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the record?',
        accept: () => {
            this.formService.schemeDelete(dataKey).subscribe((resp: APIResponse) => {
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

  editRecord(schemeId:number) {
    this.router.navigateByUrl(`main/scheme/add/${schemeId}`);
  }

}
