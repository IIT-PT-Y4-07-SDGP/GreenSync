import {Component, OnInit} from '@angular/core';
import {PRCService} from "../../../../services/prc.service";
import {PRC} from "../../../../interfaces/PRC";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-prc-list',
  templateUrl: './view-prc-list.component.html'
})
export class ViewPrcListComponent implements OnInit {
  PRCList: PRC[] = [];

  constructor(
    private prcService: PRCService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.prcService.getPRCs().subscribe((data) => {
      for (const PRC of data) {
        this.PRCList.push(PRC);
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin/driver-manager']);
  }
}
