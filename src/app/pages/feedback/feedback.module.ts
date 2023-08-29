import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';


@NgModule({
  declarations: [
    FeedbackListComponent
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    SharedModule,
    PrimeModule
  ]
})
export class FeedbackModule { }
