import { Component, OnInit } from '@angular/core';
import { PRC } from 'src/app/interfaces/PRC';
import { LoginService } from 'src/app/services/login.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-prc-admin-homepage',
  templateUrl: './prc-admin-homepage.component.html',
  styleUrls: ['./prc-admin-homepage.component.scss']
})
export class PrcAdminHomepageComponent implements OnInit {
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

  logOut() {
    this.router.navigate(['/registration']);
  }

  viewDriversList(): void {
    this.router.navigate(['/view-drivers']);
  }

  goBack() {
    this.router.navigate(['/admin/dump-type']);
  }

}
