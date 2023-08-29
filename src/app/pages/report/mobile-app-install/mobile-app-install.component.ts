import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { SharedService } from 'src/app/shared/services/shared.service';

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

  constructor(private formService: FormService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.isLoader = true;
    this.formService.getMobInstallList().subscribe((resp: any) => {
        this.dynamaicTableData = resp.data;
        this.isNotLoader = true;
        this.isLoader = false;
    });
  }

}
