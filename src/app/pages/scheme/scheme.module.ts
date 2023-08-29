import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchemeRoutingModule } from './scheme-routing.module';
import { SchemeAddComponent } from './scheme-add/scheme-add.component';
import { SchemeListComponent } from './scheme-list/scheme-list.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';


@NgModule({
  declarations: [
    SchemeAddComponent,
    SchemeListComponent
  ],
  imports: [
    CommonModule,
    SchemeRoutingModule,
    SharedModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SchemeModule { }
