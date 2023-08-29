import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';

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

  constructor(private formService: FormService, private router: Router) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.isLoader = true;
    this.formService.getfeedbackList().subscribe((resp: any) => {
        this.dynamaicTableData = resp.data;
        console.log("Data-", this.dynamaicTableData)
        this.isNotLoader = true;
        this.isLoader = false;
    });
  }

}
