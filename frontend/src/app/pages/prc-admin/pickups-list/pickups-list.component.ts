import { MatTableDataSource } from '@angular/material/table';
import { PickupService } from './../../../services/pickup.service';
import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/services/driver.service';
import { Driver } from 'src/app/interfaces/driver';

export interface Pickup {
  pickupDate: string;
  location: string;
  dumpType: string;
  status: string;
  driver: string;
}


@Component({
  selector: 'app-pickups-list',
  templateUrl: './pickups-list.component.html',
  styleUrls: ['./pickups-list.component.scss']
})
export class PickupsListComponent implements OnInit {
  modeselect:string='1';
  displayedColumns: string[] = ['pickupDate','location', 'dumpType','status','driver'];
  typeList: Pickup[] = [];
  driverList:Driver[]=[];
  dataSource = new MatTableDataSource<Pickup>(this.typeList);

  constructor(
    private pickupService:PickupService,
    private driverService:DriverService
  ) { }

  async ngOnInit() {
    await this.getDumpList();
    await this.getDriverList();
  }

  getDumpList() {
    this.typeList=[];
    this.pickupService.getPickupTypeList().subscribe((dumps: any) => {

      dumps['allPickups'].forEach((obj: any) => {
        if(obj.Status=='NEW'){
          this.typeList.push(
            {pickupDate: obj.PickupDate,location:obj.Location,dumpType:obj.DumpType,status:obj.Status,driver:obj.DriverId});
        }

      });

      this.dataSource = new MatTableDataSource<Pickup>(this.typeList);
    });

  }

  getDriverList() {
    this.typeList=[];
    this.driverService.getDriversList().subscribe((drivers: any) => {
      console.log(drivers);

      this.driverList=drivers;
    });

  }

}
