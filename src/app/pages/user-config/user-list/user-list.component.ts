import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  dynamaicTableData: any;

  constructor() { }

  ngOnInit(): void {
    this.dynamaicTableData = {
      cols:[
        { field: 'uid', header: 'UserId' },
        { field: 'uname', header: 'Username' },
        { field: 'department', header: 'Department' },
        { field: 'status', header: 'Status' }
      ],
      values:[
        {uid:'012',uname:'Thiru',department:'TNEB', status:'active'},
        {uid:'0132',uname:'Mani',department:'TNEB', status:'active'},
        {uid:'0142',uname:'Sethu',department:'TNEB', status:'active'},
        {uid:'0125',uname:'Viruman',department:'TNEB', status:'active'},
        {uid:'0162',uname:'Kamal',department:'TNEB', status:'active'},
        {uid:'01782',uname:'Praveen',department:'TNEB', status:'active'},
        {uid:'012',uname:'Kamal',department:'TNEB', status:'active'},
        {uid:'0132',uname:'Mani',department:'TNEB', status:'active'},
        {uid:'0142',uname:'Sethu',department:'TNEB', status:'active'},
        {uid:'0125',uname:'Viruman',department:'TNEB', status:'active'},
        {uid:'0162',uname:'Lyla',department:'TNEB', status:'active'},
        {uid:'01782',uname:'KArthi',department:'TNEB', status:'active'},
      ]
    }
  }

}
