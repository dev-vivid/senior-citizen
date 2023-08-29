import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { ReportRoutingModule } from './report-routing.module';
import { SeniorCitizenRegistrationComponent } from './senior-citizen-registration/senior-citizen-registration.component';
import { MobileAppInstallComponent } from './mobile-app-install/mobile-app-install.component';

@NgModule({
  declarations: [
    SeniorCitizenRegistrationComponent,
    MobileAppInstallComponent,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ReportModule { }
