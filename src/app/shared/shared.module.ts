import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from './modules/prime/prime.module';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { FooterComponent } from './components/footer/footer.component';
import { DynamicReportTableComponent } from './components/dynamic-report-table/dynamic-report-table.component';
import { AuthguardServiceService } from './services/authguard-service.service';
import { DynamicCsvComponent } from './components/dynamic-csv/dynamic-csv.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from './modules/material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { DynamicDelTableComponent } from './components/dynamic-del-table/dynamic-del-table.component';
@NgModule({
  declarations: [ DynamicTableComponent, FooterComponent, DynamicReportTableComponent, DynamicCsvComponent, LoaderComponent, DynamicDelTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
    PrimeModule,
    MaterialModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 1000,
    }),
  ], 
  providers:[AuthguardServiceService],
  exports: [DynamicTableComponent,FooterComponent,DynamicReportTableComponent,DynamicCsvComponent,LoaderComponent,DynamicDelTableComponent]
})
export class SharedModule { }
 