import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictListComponent } from './district-list/district-list.component';
import { DistrictAddComponent } from './district-add/district-add.component';
import { HospitalAddComponent } from './hospital-add/hospital-add.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { OfficerTypeAddComponent } from './officer-type-add/officer-type-add.component';
import { OfficerTypeListComponent } from './officer-type-list/officer-type-list.component';
import { OfficerAddComponent } from './officer-add/officer-add.component';
import { OldAgeListComponent } from './old-age-list/old-age-list.component';
import { OldAgeAddComponent } from './old-age-add/old-age-add.component';
import { OldAgeTypeListComponent } from './old-age-type-list/old-age-type-list.component';
import { OldAgeTypeAddComponent } from './old-age-type-add/old-age-type-add.component';
import { OfficerListComponent } from './officer-list/officer-list.component';
import { MedicalTypeAddComponent } from './medical-type-add/medical-type-add.component';
import { MedicalTypeListComponent } from './medical-type-list/medical-type-list.component';
import { MedicalAddComponent } from './medical-add/medical-add.component';
import { MedicalListComponent } from './medical-list/medical-list.component';
import { PeoplePharmacyAddComponent } from './people-pharmacy-add/people-pharmacy-add.component';
import { PeoplePharmacyComponent } from './people-pharmacy/people-pharmacy.component';
import { LegalAidAddComponent } from './legal-aid-add/legal-aid-add.component';
import { LegalAidComponent } from './legal-aid/legal-aid.component';

const routes: Routes = [
  {
    path: 'district-add',
    component: DistrictAddComponent
  },
  {
    path: 'district-add/:editId',
    component: DistrictAddComponent
  },
  {
    path: 'district',
    component: DistrictListComponent
  },
  {
    path: 'hospital-add',
    component: HospitalAddComponent
  },
  {
    path: 'hospital-add/:editId',
    component: HospitalAddComponent
  },
  {
    path: 'hospital',
    component: HospitalListComponent
  },
  {
    path: 'medical-add',
    component: MedicalAddComponent
  },
  {
    path: 'medical-add/:editId',
    component: MedicalAddComponent
  },
  {
    path: 'medical',
    component: MedicalListComponent
  },
  {
    path: 'medical-type-add',
    component: MedicalTypeAddComponent
  },
  {
    path: 'medical-type-add/:editId',
    component: MedicalTypeAddComponent
  },
  {
    path: 'medical-type',
    component: MedicalTypeListComponent
  },
  {
    path: 'officer-type-add',
    component: OfficerTypeAddComponent
  },
  {
    path: 'officer-type-add/:editId',
    component: OfficerTypeAddComponent
  },
  {
    path: 'officer-type',
    component: OfficerTypeListComponent
  },
  {
    path: 'officer-add',
    component: OfficerAddComponent
  },
  {
    path: 'officer-add/:editId',
    component: OfficerAddComponent
  },
  {
    path: 'officer',
    component: OfficerListComponent
  },
  {
    path: 'oldage-add',
    component: OldAgeAddComponent
  },
  {
    path: 'oldage-add/:editId',
    component: OldAgeAddComponent
  },
  {
    path: 'oldage',
    component: OldAgeListComponent
  },
  {
    path: 'oldage-type-add',
    component: OldAgeTypeAddComponent
  },
  {
    path: 'oldage-type-add/:editId',
    component: OldAgeTypeAddComponent
  },
  {
    path: 'oldage-type',
    component: OldAgeTypeListComponent
  },
  {
    path: 'people-pharmacy-add',
    component: PeoplePharmacyAddComponent
  },
  {
    path: 'people-pharmacy-add/:editId',
    component: PeoplePharmacyAddComponent
  },
  {
    path: 'people-pharmacy',
    component: PeoplePharmacyComponent
  },
  {
    path: 'legal-aid-add',
    component: LegalAidAddComponent
  },
  {
    path: 'legal-aid-add/:editId',
    component: LegalAidAddComponent
  },
  {
    path: 'legal-aid',
    component: LegalAidComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }