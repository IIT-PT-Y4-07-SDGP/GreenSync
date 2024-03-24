import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  requestId: number;
  userName: string;
  location: string;
  dumpType: string;
  description: string;
  status: string;
  driver: string;
  price: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {requestId: 1, userName: 'Hydrogen',location:'sddji',dumpType:'ddd',description:'description',status:'ewew',driver:'ewewwe',price: 1.0079},
];
@Component({
  selector: 'app-pickups-list',
  templateUrl: './pickups-list.component.html',
  styleUrls: ['./pickups-list.component.scss']
})
export class PickupsListComponent implements OnInit {
  modeselect:string='1';
  displayedColumns: string[] = ['requestId', 'userName', 'location', 'dumpType','description','status','driver','price'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
