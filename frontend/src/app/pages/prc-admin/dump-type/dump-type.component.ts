import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  index: number;
  dumpType: string;
  price: number;
  removeVehicle: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {index: 1, dumpType: 'Hydrogen', price: 1.0079, removeVehicle: 'H'},
  {index: 2, dumpType: 'Helium', price: 4.0026, removeVehicle: 'He'},
  {index: 3, dumpType: 'Lithium', price: 6.941, removeVehicle: 'Li'},
  {index: 4, dumpType: 'Beryllium', price: 9.0122, removeVehicle: 'Be'}
];

@Component({
  selector: 'app-dump-type',
  templateUrl: './dump-type.component.html',
  styleUrls: ['./dump-type.component.scss']
})


export class DumpTypeComponent implements OnInit {

  displayedColumns: string[] = ['index', 'dumpType', 'price', 'removeVehicle'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
