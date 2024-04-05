import {Component, OnInit} from '@angular/core';
import {PrcService} from "../../../../services/prc.service";
import {PRC} from "../../../../interfaces/PRC";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-prc-list',
  templateUrl: './view-prc-list.component.html',
  styleUrls: ['./view-prc-list.component.scss']
})
export class ViewPrcListComponent implements OnInit {
  PRCList: PRC[] = [];

  constructor(private prcService: PrcService,
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
