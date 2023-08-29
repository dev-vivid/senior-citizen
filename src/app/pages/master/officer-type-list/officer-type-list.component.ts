import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { ConfirmationService } from 'primeng/api';
import { APIResponse } from 'src/app/shared/models/api-response';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-officer-type-list',
  templateUrl: './officer-type-list.component.html',
  styleUrls: ['./officer-type-list.component.scss']
})
export class OfficerTypeListComponent implements OnInit {
  dynamaicTableData: any;
  submitted: boolean;
  // isLoader: boolean;
  // isNotLoader: boolean;

  constructor(private formService: FormService, private router: Router, private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    // this.isLoader = true;
    this.formService.getOfficerType().subscribe((resp: any) => {
        this.dynamaicTableData = resp.data;
        // this.isNotLoader = true;
        // this.isLoader = false;
    });
  }
  deleteRecord(offTypeId:number){
    const dataKey = { officerTypeId: offTypeId };
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the record?',
        accept: () => {
            this.formService.deleteofficerType(dataKey).subscribe((resp: APIResponse) => {
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
    this.router.navigateByUrl(`main/master/officer-type-add/${editId}`);
  }

}
