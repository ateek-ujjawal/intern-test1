import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

export interface MonitorData {
  COL1: number;
  COL2: number;
  COL3: string;
  COL4: string;
  COL5: string;
  COL6: string;
  COL7: string;
  COL18: string;
  COL19: number;
  COL20: number;
  DESCRIPTION: string;
  ENABLED_FLAG: string;
  LOOKUP_TYPE: string;
  LOOKUP_CODE: string;
  START_DATE: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;
  displayedColumns: string[] = ['LOOKUP_TYPE','LOOKUP_CODE','DESCRIPTION','ENABLED_FLAG', 'START_DATE', 'COL1', 'COL2', 'COL3', 'COL4', 'COL5', 'COL6', 'COL7', 'COL18', 'COL19', 'COL20'];
  jsonData: MonitorData[] = null;
  dataSource = null;

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  @ViewChild(MatSort, {static: false})
  set sort(value1: MatSort) {
  	this.dataSource.sort = value1
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onFileChange(ev) {
    let workBook = null;
    let tempData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' , cellDates: true, dateNF: 'yyyy/mm/dd;@'});
      tempData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        console.log(sheet)
        return initial[name];
      }, {});
      tempData = tempData.map(({LOOKUP_TYPE,LOOKUP_CODE,DESCRIPTION,ENABLED_FLAG, START_DATE, COL1, COL2, COL3, COL4,COL5, COL6, COL7, COL18, COL19, COL20}) => ({LOOKUP_TYPE,LOOKUP_CODE,DESCRIPTION,ENABLED_FLAG, START_DATE, COL1, COL2, COL3, COL4,COL5, COL6, COL7, COL18, COL19, COL20}));
      const dataString = JSON.stringify(tempData);
      this.jsonData = tempData;
      this.dataSource = new MatTableDataSource<MonitorData>(this.jsonData);
      console.log(this.jsonData)
    }
    reader.readAsBinaryString(file);
  }
}
