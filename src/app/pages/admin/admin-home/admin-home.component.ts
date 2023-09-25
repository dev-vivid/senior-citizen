import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DatePipe } from '@angular/common';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { TranslationPipe } from 'src/app/shared/services/translation.pipe';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminHomeComponent implements OnInit {
  pipe = new DatePipe('en-US');
  isAdmin: boolean = false;
  userData: any;
  dueModal: boolean;
  lineStylesData: any;
  data: any;
  //chart
  basicOptions: any;
  feedback: any;
  Datapie: any;
  chartData: any;
  dbCount: any
  currentLanguage: string;

  constructor(private router: Router, private formService: FormService, private sharedService: SharedService,
    public translationService: TranslationService,private languageService: LanguageService) {
    }

  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
    this.getchart();
    this.getAdminDashboard();
    if (this.userData.data.roleId === 1) {
      this.isAdmin = true;
    } 

  }
  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  getAdminDashboard() {
    this.formService.getAdminDashboard().subscribe(
      (resp: any) => {
        if (resp.status = 200) {
          this.dbCount = resp.data;
          const scCount = resp.data.seniorCitizen;
          this.feedback = {
            labels: ['Male', 'Female'],
            datasets: [
              {
                data: [scCount.Male, scCount.Female],
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                ],
              },
            ],
          };
        } else {
          this.sharedService.showError('Error');
        }
      },
      (error) => {
        this.sharedService.showError('Error');
      }
    );
  }
  
  
  getchart() {
    this.formService.getChartData().subscribe(
      (resp: any) => {
        if (resp.status = 200) {
          this.Datapie = resp.data[0];
          this.chartData = {
            labels: this.Datapie.labels,
            datasets: [
              {
                label: 'Senior Citizen',
                backgroundColor: '#2a9235',
                data: this.Datapie.userMonthwise,
              },
              {
                label: 'Helpline Calls',
                backgroundColor: '#FFC107',
                data: this.Datapie.helplineMonthwise,
              },
            ],
          };
        } else {
          this.sharedService.showError('Error');
        }
      },
      (error) => {
        this.sharedService.showError('Error');
      }
    );
  }
  


}