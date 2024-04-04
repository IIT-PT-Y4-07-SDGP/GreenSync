import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prc-driver-dashboard',
  templateUrl: './prc-driver-dashboard.component.html',
  styleUrls: ['./prc-driver-dashboard.component.scss']
})
export class PrcDriverDashboardComponent implements OnInit {

  constructor(    private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.router.navigate(['/login-page']);
  }
}
