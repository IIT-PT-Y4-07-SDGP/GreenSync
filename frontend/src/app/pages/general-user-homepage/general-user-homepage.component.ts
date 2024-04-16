import { Component, OnInit } from '@angular/core';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-general-user-homepage',
  templateUrl: './general-user-homepage.component.html',
  styleUrls: ['./general-user-homepage.component.scss']
})
export class GeneralUserHomepageComponent implements OnInit {

    public userData?: GeneralUser; // Holds the data of the logged-in user

    constructor(
      private userService: UserService 
    ) { }

    ngOnInit(): void {
      this.userData = this.userService.getGeneralUser(); // Fetching user data when the component initializes
    }
}
