import { Component, OnInit } from '@angular/core';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { LoginService } from 'src/app/services/login-service';

@Component({
  selector: 'app-general-user-homepage',
  templateUrl: './general-user-homepage.component.html',
  styleUrls: ['./general-user-homepage.component.scss']
})
export class GeneralUserHomepageComponent implements OnInit {

    public userData?: GeneralUser;

    constructor(
      private loginService: LoginService
    ) { }

    ngOnInit(): void {
      this.userData = this.loginService.getGeneralUser();
      console.log(this.userData);
    }
}
