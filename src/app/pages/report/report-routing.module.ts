import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeniorCitizenRegistrationComponent } from './senior-citizen-registration/senior-citizen-registration.component';
import { MobileAppInstallComponent } from './mobile-app-install/mobile-app-install.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: 'scDetails',
    component: SeniorCitizenRegistrationComponent
  },
  {
    path: 'mobileAppInstalled',
    component: MobileAppInstallComponent
  },  {
    path: 'userdetails',
    component: UserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
