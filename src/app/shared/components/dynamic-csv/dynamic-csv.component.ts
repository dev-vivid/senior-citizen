import { Component, OnInit, Input } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-dynamic-csv',
  templateUrl: './dynamic-csv.component.html',
  styleUrls: ['./dynamic-csv.component.scss']
})
export class DynamicCsvComponent implements OnInit {
  @Input() dynamaicDataForTable = {
    cols:[],
    reportHeader:[],
    values:[]
  }
  constructor() { }

  ngOnInit(): void {
  }

  csv_fileDownload() {
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: '',
      useBom: true,
      headers: this.dynamaicDataForTable.reportHeader
    };
    new ngxCsv(this.dynamaicDataForTable.values, "Report", options);
  }

}
