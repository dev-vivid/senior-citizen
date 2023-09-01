import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {

  dynamaicTableData: any;
  submitted: boolean;
  isLoader: boolean;
  isNotLoader: boolean;

  constructor(private formService: FormService, private router: Router,private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.isLoader = true;
    this.formService.getfeedbackList().subscribe((resp: any) => {
      if (resp.status = 200) {
        this.dynamaicTableData = resp.data;
        console.log("Data-", this.dynamaicTableData)
        this.isNotLoader = true;
        this.isLoader = false;
      }
       else {
          this.sharedService.showError('Error');
        }
      },
      (error) => {
        this.sharedService.showError('Error');
      }
    )
  };
  }


