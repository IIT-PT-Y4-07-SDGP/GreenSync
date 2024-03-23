import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prc-driver-pending-pickups',
  templateUrl: './prc-driver-pending-pickups.component.html',
  styleUrls: ['./prc-driver-pending-pickups.component.scss']
})
export class PrcDriverPendingPickupsComponent implements OnInit {

  panelOpenState:boolean=true;
  constructor() { }

  ngOnInit(): void {
    this.panelOpenState = false;
  }

}
