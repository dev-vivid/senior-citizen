import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-dynamic-table-edit',
  templateUrl: './dynamic-table-edit.component.html',
  styleUrls: ['./dynamic-table-edit.component.scss']
})
export class DynamicTableEditComponent implements OnInit {
  cols: any[];
  tableData:any[]=[];
  searchHeader: any[] = ['name'];
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
