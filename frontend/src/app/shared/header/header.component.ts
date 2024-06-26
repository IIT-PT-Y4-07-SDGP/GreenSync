import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserType } from 'src/app/enums/userTypes';
import { MC } from 'src/app/interfaces/MC';
import { PRC } from 'src/app/interfaces/PRC';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { RedeemComponent } from 'src/app/components/redeem/redeem.component';
import { PointsService } from 'src/app/services/points.service';
import { UserService } from 'src/app/services/user.service';
import { MCService } from 'src/app/services/mc.service';
import { PRCService } from 'src/app/services/prc.service';

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

  constructor(
    private router: Router, 
    private dialog: MatDialog, 
    private pointsService: PointsService,
    private userService: UserService,
    private mcService: MCService,
    private prcService: PRCService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoutes();
        this.setUsername();
        this.pointsService.fethUserDetails();
        this.pointsService.currentPoints.subscribe(points => this.points = points);
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
      let userDetails: GeneralUser | undefined = this.userService.getGeneralUser();
      this.username = userDetails?.account.username.toString();
      this.points = userDetails?.points;
      this.userId = userDetails?._id;
    } 
    else if(this.userType == this.userTypes.MC){
      let MC: MC | undefined = this.mcService.getMC();
      this.username = MC?.account.username.toString();
      this.MCName = MC?.MCName;
    }
    else if(this.userType == this.userTypes.PRC){
      let PRC: PRC | undefined = this.prcService.getPRC();
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
