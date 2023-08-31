import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  encapsulation:ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent implements OnInit,OnChanges {
  cols: any[];
  tableData:any[]=[];
  loading: boolean;
  searchHeader: any[] = ['firstName','gpfCpsNo','name','scheme_name','government'];
  @Input() dynamaicTableData = {
    cols:[],
    values:[]
  }
  @Output() edit  = new EventEmitter();
  @Output() delete  = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    //this.cdr.detach();  // strategy should significantly reduce the change detection calls
    this.loading = true;
    if(changes.dynamaicTableData.currentValue){
      //filter(f=>f.field!=='id' && f.field!=='sno-key');
        // this.cdr.detectChanges();
        this.cols = this.dynamaicTableData.cols.filter(f=>f.field!=='id');
        this.tableData = this.dynamaicTableData.values;
        this.loading = false;
    }
  }

  ngOnInit(): void {
   
  }
  deleteRecord(data:any){ 
    this.delete.emit(data.id)
  }

  editRecord(data:any){ 
    this.edit.emit(data.id)
  }
  
  clear(table: Table) {
      table.clear();
  }

}
