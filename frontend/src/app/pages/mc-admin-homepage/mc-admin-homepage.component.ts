import { Component, OnInit } from '@angular/core';
import { MC } from 'src/app/interfaces/MC';
import { LoginService } from 'src/app/services/login-service';

@Component({
  selector: 'app-mc-admin-homepage',
  templateUrl: './mc-admin-homepage.component.html',
  styleUrls: ['./mc-admin-homepage.component.scss']
})
export class McAdminHomepageComponent implements OnInit {
  public MC?: MC;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.MC = this.loginService.getMC();
  }

}
