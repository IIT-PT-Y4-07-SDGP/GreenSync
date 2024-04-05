import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserType } from 'src/app/enums/userTypes';
import { MC } from 'src/app/interfaces/MC';
import { PRC } from 'src/app/interfaces/PRC';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { LoginService } from 'src/app/services/login.service';
import { RedeemComponent } from 'src/app/components/redeem/redeem.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  showHeader: boolean = true;
  userType?:  UserType;
  userTypes = UserType;
  username?: String;
  profilePicture: String = '';
  points?: number;
  PRCName?: String;
  MCName?: String;
  userId?: String;

  constructor(private router: Router, private loginService: LoginService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoutes();
        this.setUsername();
      }
    });
  }

  checkRoutes() {
    const currentUrl = this.router.url;
    if (currentUrl == "/" || currentUrl.includes('registration') || currentUrl.includes('login-page')) {
      this.showHeader = false;
    } else {
      this.showHeader = true;
      if (currentUrl.includes('prc-admin-homepage')) {
        this.userType = UserType.PRC;
      } else if (currentUrl.includes('mc-admin-homepage')) {
        this.userType = UserType.MC;
      } else if (currentUrl.includes('user-homepage')){
        this.userType = UserType.GENERAL_USER;
      }
    }
  }

  toggleMenu() {
    
  }

  setUsername(){
    if(this.userType == this.userTypes.GENERAL_USER){
      let userDetails: GeneralUser | undefined = this.loginService.getGeneralUser();
      this.username = userDetails?.account.username.toString();
      this.points = userDetails?.points;
      this.userId = userDetails?._id;
    } 
    else if(this.userType == this.userTypes.MC){
      let MC: MC | undefined = this.loginService.getMC();
      this.username = MC?.account.username.toString();
      this.MCName = MC?.MCName;
    }
    else if(this.userType == this.userTypes.PRC){
      let PRC: PRC | undefined = this.loginService.getPRC();
      this.username = PRC?.account.username.toString();
      this.PRCName = PRC?.PRCName.toString();
    }
  }

  openRedeemPopUp(){
    this.dialog.open(RedeemComponent, {
      height: '255px',
      width: '450px',
    });
}
}
