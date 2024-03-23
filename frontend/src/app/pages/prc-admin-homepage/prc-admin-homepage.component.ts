import { Component, OnInit } from '@angular/core';
import { PRC } from 'src/app/interfaces/PRC';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-prc-admin-homepage',
  templateUrl: './prc-admin-homepage.component.html',
  styleUrls: ['./prc-admin-homepage.component.scss']
})
export class PrcAdminHomepageComponent implements OnInit {
  public PRC?: PRC;
  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.PRC = this.loginService.getPRC(); 
    console.log(this.PRC);
  }

}
