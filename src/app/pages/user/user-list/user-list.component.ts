import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  dynamaicTableData: any;
  submitted: boolean;
  isLoader: boolean;
  isNotLoader: boolean;

  constructor(public translationService: TranslationService,private formService: FormService, private router: Router,private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getList();
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  } 

  getList() {
    // this.isLoader = true;
    // this.formService.getfeedbackList().subscribe((resp: any) => {
    //   if (resp.status = 200) {
    //     this.dynamaicTableData = resp.data;
    //     console.log("Data-", this.dynamaicTableData)
    //     this.isNotLoader = true;
    //     this.isLoader = false;
    //   }
    //    else {
    //       this.sharedService.showError('Error');
    //     }
    //   },
    //   (error) => {
    //     this.sharedService.showError('Error');
    //   }
    // )
  };

}
