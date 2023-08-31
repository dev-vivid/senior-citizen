import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-dynamic-report-table',
  templateUrl: './dynamic-report-table.component.html',
  styleUrls: ['./dynamic-report-table.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DynamicReportTableComponent implements OnInit {
  cols: any[];
  tableData:any[]=[];
  searchHeader: any[] = ['uid','uname','government'];
  loading: boolean;
  @Input() dynamaicTableData = {
    cols:[],
    values:[]
  }
  @Output() edit  = new EventEmitter();
  @Output() delete  = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    if(changes.dynamaicTableData.currentValue){
      this.cols = this.dynamaicTableData.cols.filter(f=>f.field!=='id');
      this.tableData = this.dynamaicTableData.values;

      this.loading = false;
    }
  }
  constructor() { }

  ngOnInit(): void {
   
  }

  editRecord(data:any){ 
    this.edit.emit(data.id)
  }
  deleteRecord(data:any){ 
    this.delete.emit(data.id)
  }
  
  clear(table: Table) {
      table.clear();
  }

}
