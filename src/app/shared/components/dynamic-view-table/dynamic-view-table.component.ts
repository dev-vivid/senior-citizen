import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-dynamic-view-table',
  templateUrl: './dynamic-view-table.component.html',
  styleUrls: ['./dynamic-view-table.component.scss']
})
export class DynamicViewTableComponent implements OnInit {
  cols: any[];
  tableData:any[]=[];
  loading: boolean;
  searchHeader: any[] = ['district_id','gpfCpsNo','name','scheme_name','government'];
  serialNumberCounter: number = 1;
  @Input() dynamaicTableData = {
    cols:[],
    values:[]
  }
  @Output() view  = new EventEmitter();


  constructor(private cdr: ChangeDetectorRef) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    //this.cdr.detach();  // strategy should significantly reduce the change detection calls
    this.loading = true;
    if(changes.dynamaicTableData.currentValue){
      //filter(f=>f.field!=='id' && f.field!=='sno-key');
        // this.cdr.detectChanges();
        this.cols = this.dynamaicTableData.cols.filter(f=>f.field!=='id');
        this.tableData = this.dynamaicTableData.values;
        this.updateSerialNumbers();
        this.loading = false;
    }
  }

  ngOnInit(): void {
  }

  
  clear(table: Table) {
      table.clear();
  }
  viewTable(data:any){ 
    this.view.emit(data)
  }
  updateSerialNumbers() {
    this.serialNumberCounter = 1;
    this.tableData.forEach(record => {
      record.serialNumber = this.serialNumberCounter++;
    });
  }

}
