import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Observable, merge } from 'rxjs';
import * as mdata from './data.json';


export interface MonitorData {
  COL1: string;
  COL2: string;
  COL3: string;
  COL4: string;
  COL5: string;
  COL6: string;
  COL7: string;
  COL18: string;
  COL19: string;
  COL20: string;
  DESCRIPTION: string;
  ENABLED_FLAG: string;
  LOOKUP_TYPE: string;
  LOOKUP_CODE: string;
  START_DATE: string;
  STATUS: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  jsonData: MonitorData[] = null;
  dataSource = null;

  form:FormGroup = new FormGroup({
    STATUS: new FormControl(false),
    LOOKUP_TYPE: new FormControl(true),
    LOOKUP_CODE: new FormControl(false),
    START_DATE: new FormControl(false),
    ENABLED_FLAG: new FormControl(false),
    DESCRIPTION: new FormControl(true),
    COL1: new FormControl(false),
    COL2: new FormControl(false),
    COL3: new FormControl(false),
    COL4: new FormControl(false),
    COL5: new FormControl(true),
    COL6: new FormControl(true),
    COL7: new FormControl(true),
    COL18: new FormControl(false),
    COL19: new FormControl(false),
    COL20: new FormControl(false)
  });

  STATUS = this.form.get('STATUS');
  LOOKUP_TYPE = this.form.get('LOOKUP_TYPE');
  LOOKUP_CODE = this.form.get('LOOKUP_CODE');
  START_DATE = this.form.get('START_DATE');
  ENABLED_FLAG = this.form.get('ENABLED_FLAG');
  DESCRIPTION = this.form.get('DESCRIPTION');
  COL1 = this.form.get('COL1');
  COL2 = this.form.get('COL2');
  COL3 = this.form.get('COL3');
  COL4 = this.form.get('COL4');
  COL5 = this.form.get('COL5');
  COL6 = this.form.get('COL6');
  COL7 = this.form.get('COL7');
  COL18 = this.form.get('COL18');
  COL19 = this.form.get('COL19');
  COL20 = this.form.get('COL20');

  columnDefinitions = [
    { def: 'STATUS', label: 'Status', hide: this.STATUS.value},
    { def: 'LOOKUP_TYPE', label: 'Lookup Type', hide: this.LOOKUP_TYPE.value},
    { def: 'LOOKUP_CODE', label: 'Monitor ID', hide: this.LOOKUP_CODE.value},
    { def: 'START_DATE', label: 'Start Date', hide: this.START_DATE.value},
    { def: 'ENABLED_FLAG', label: 'Enabled Flag', hide: this.ENABLED_FLAG.value},
    { def: 'DESCRIPTION', label: 'Mail Body', hide: this.DESCRIPTION.value},
    { def: 'COL1', label: 'Interval(minutes)', hide: this.COL1.value},
    { def: 'COL2', label: 'Order By', hide: this.COL2.value},
    { def: 'COL3', label: 'Monitor Type', hide: this.COL3.value},
    { def: 'COL4', label: 'Date Select Type', hide: this.COL4.value},
    { def: 'COL5', label: 'From Email', hide: this.COL5.value},
    { def: 'COL6', label: 'To Email', hide: this.COL6.value},
    { def: 'COL7', label: 'Description', hide: this.COL7.value},
    { def: 'COL18', label: 'Last Run Status', hide: this.COL18.value},
    { def: 'COL19', label: 'Last Found Date', hide: this.COL19.value},
    { def: 'COL20', label: 'Last Run Date', hide: this.COL20.value},
  ]

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  getDisplayedColumns():string[] {
    return this.columnDefinitions.filter(cd=>!cd.hide).map(cd=>cd.def);
  }

  constructor() {
    let tempData = mdata["Sheet1"];
    console.log(tempData);
    this.jsonData = tempData.map(
      ({LOOKUP_TYPE,LOOKUP_CODE,DESCRIPTION,ENABLED_FLAG, START_DATE, COL1, COL2, COL3, COL4,COL5, COL6, COL7, COL18, COL19, COL20}) =>
      ({LOOKUP_TYPE,LOOKUP_CODE,DESCRIPTION,ENABLED_FLAG, START_DATE, COL1, COL2, COL3, COL4,COL5, COL6, COL7, COL18, COL19, COL20, STATUS : "null"}));
    this.jsonData.forEach((element) => {
      if(element.COL19 == element.COL20)
        element.STATUS = "red";
      else
        element.STATUS = "green";
    })
    this.dataSource = new MatTableDataSource<MonitorData>(this.jsonData);
    console.log(this.jsonData)
    let o1:Observable<boolean> = this.LOOKUP_TYPE.valueChanges;
     let o2:Observable<boolean> = this.LOOKUP_CODE.valueChanges;
     let o3:Observable<boolean> = this.START_DATE.valueChanges;
     let o4:Observable<boolean> = this.ENABLED_FLAG.valueChanges;
     let o5:Observable<boolean> = this.DESCRIPTION.valueChanges;
     let o6:Observable<boolean> = this.COL1.valueChanges;
     let o7:Observable<boolean> = this.COL2.valueChanges;
     let o8:Observable<boolean> = this.COL3.valueChanges;
     let o9:Observable<boolean> = this.COL4.valueChanges;
     let o10:Observable<boolean> = this.COL5.valueChanges;
     let o11:Observable<boolean> = this.COL6.valueChanges;
     let o12:Observable<boolean> = this.COL7.valueChanges;
     let o13:Observable<boolean> = this.COL18.valueChanges;
     let o14:Observable<boolean> = this.COL19.valueChanges;
     let o15:Observable<boolean> = this.COL20.valueChanges;
     let o16:Observable<boolean> = this.STATUS.valueChanges;

     merge(o1, o2, o3, o4, o5, o6, o7, o8, o9, o10, o11, o12, o13, o14, o15, o16).subscribe( v=>{
     this.columnDefinitions[0].hide = this.STATUS.value;
     this.columnDefinitions[1].hide = this.LOOKUP_TYPE.value;
     this.columnDefinitions[2].hide = this.LOOKUP_CODE.value;
     this.columnDefinitions[3].hide = this.START_DATE.value;  
     this.columnDefinitions[4].hide = this.ENABLED_FLAG.value;  
     this.columnDefinitions[5].hide = this.DESCRIPTION.value;  
     this.columnDefinitions[6].hide = this.COL1.value;  
     this.columnDefinitions[7].hide = this.COL2.value;  
     this.columnDefinitions[8].hide = this.COL3.value;  
     this.columnDefinitions[9].hide = this.COL4.value;  
     this.columnDefinitions[10].hide = this.COL5.value;  
     this.columnDefinitions[11].hide = this.COL6.value;  
     this.columnDefinitions[12].hide = this.COL7.value;  
     this.columnDefinitions[13].hide = this.COL18.value;  
     this.columnDefinitions[14].hide = this.COL19.value;  
     this.columnDefinitions[15].hide = this.COL20.value;  
        console.log(this.columnDefinitions);
      });
    }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
