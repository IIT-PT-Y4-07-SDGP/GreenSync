import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-prc-admin',
  templateUrl: './prc-admin.component.html',
  styleUrls: ['./prc-admin.component.scss']
})
export class PrcAdminComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log();
  }

  createDriver(): void {
    this.router.navigate(['/create-driver']);
  }

  viewPrcList(): void {
    this.router.navigate(['/prc-list']);
  }

  viewDriversList(): void {
    this.router.navigate(['/view-drivers']);
  }

}
