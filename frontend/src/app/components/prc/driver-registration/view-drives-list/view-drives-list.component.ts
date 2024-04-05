import {Component, OnInit} from '@angular/core';
import {DriverService} from "../../../../services/driver.service";
import {Driver} from "../../../../interfaces/driver";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-drives-list',
  templateUrl: './view-drives-list.component.html',
  styleUrls: ['./view-drives-list.component.scss']
})
export class ViewDrivesListComponent implements OnInit {
  driversList: Driver[] = [];

  constructor(private driverService: DriverService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.driverService.getDriversList().subscribe((drivers) => {
      for (const driver of drivers) {
        this.driversList.push(driver);
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin/driver-manager']);
  }
}
