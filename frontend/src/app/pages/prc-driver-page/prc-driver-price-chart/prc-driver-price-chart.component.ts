import { Component, OnInit } from '@angular/core';
import { DumpService } from 'src/app/services/dump.service';

@Component({
  selector: 'app-prc-driver-price-chart',
  templateUrl: './prc-driver-price-chart.component.html',
  styleUrls: ['./prc-driver-price-chart.component.scss']
})
export class PrcDriverPriceChartComponent implements OnInit {
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
