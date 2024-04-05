import { Component, OnInit } from '@angular/core';
// blankcommit
@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit {
  public complainType: string = "illegal-garbage-dump-report"
  constructor() { }

  ngOnInit(): void {
  }
  
  isReportGarbageClicked(){
    
  }
}
