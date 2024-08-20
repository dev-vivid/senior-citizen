import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    PrimeModule,
    MaterialModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
