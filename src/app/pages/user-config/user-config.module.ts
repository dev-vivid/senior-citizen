import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserConfigRoutingModule } from './user-config-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserConfigRoutingModule, 
    SharedModule,
    PrimeModule
  ]
})
export class UserConfigModule { }
