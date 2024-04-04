import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DumpService } from 'src/app/services/dump.service';

@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.scss']
})
export class PriceChartComponent implements OnInit {

  typeList: any[] = [];
  constructor(
    private dumpService: DumpService
    ) {
  }

  ngOnInit(): void {
    this.getDumpList();

   }

   getDumpList() {
     this.typeList=[];
     this.dumpService.getDumpTypeList().subscribe((dumps: any) => {
       this.typeList=dumps['allDumps'];
     });

   }

}
