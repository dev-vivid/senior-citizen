import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DistrictListComponent } from './district-list/district-list.component';
import { DistrictAddComponent } from './district-add/district-add.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { HospitalAddComponent } from './hospital-add/hospital-add.component';
import { OfficerTypeListComponent } from './officer-type-list/officer-type-list.component';
import { OfficerTypeAddComponent } from './officer-type-add/officer-type-add.component';
import { OldAgeTypeAddComponent } from './old-age-type-add/old-age-type-add.component';
import { OldAgeTypeListComponent } from './old-age-type-list/old-age-type-list.component';
import { OldAgeAddComponent } from './old-age-add/old-age-add.component';
import { OldAgeListComponent } from './old-age-list/old-age-list.component';
import { OfficerAddComponent } from './officer-add/officer-add.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { OfficerListComponent } from './officer-list/officer-list.component';
import { MedicalTypeListComponent } from './medical-type-list/medical-type-list.component';
import { MedicalTypeAddComponent } from './medical-type-add/medical-type-add.component';
import { MedicalListComponent } from './medical-list/medical-list.component';
import { MedicalAddComponent } from './medical-add/medical-add.component';
import { PeoplePharmacyComponent } from './people-pharmacy/people-pharmacy.component';
import { LegalAidComponent } from './legal-aid/legal-aid.component';
import { PeoplePharmacyAddComponent } from './people-pharmacy-add/people-pharmacy-add.component';
import { LegalAidAddComponent } from './legal-aid-add/legal-aid-add.component';
import { GrievanceListComponent } from './grievance-list/grievance-list.component';
import { GrivanceFormComponent } from './grivance-form/grivance-form.component';
@NgModule({
  declarations: [
    DistrictListComponent,
    DistrictAddComponent,
    HospitalListComponent,
    HospitalAddComponent,
    OfficerTypeListComponent,
    OfficerTypeAddComponent,
    OldAgeTypeAddComponent,
    OldAgeTypeListComponent,
    OldAgeAddComponent,
    OldAgeListComponent,
    OfficerAddComponent,
    OfficerListComponent,
    MedicalTypeListComponent,
    MedicalTypeAddComponent,
    MedicalListComponent,
    MedicalAddComponent,
    PeoplePharmacyComponent,
    LegalAidComponent,
    PeoplePharmacyAddComponent,
    LegalAidAddComponent,
    GrievanceListComponent,
    GrivanceFormComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule,
    PrimeModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class MasterModule { }