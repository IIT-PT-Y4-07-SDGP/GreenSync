import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("");

  }

  logOut(){
    this.router.navigate(['/login-page']);
  }
}
