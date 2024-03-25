import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { LoginService } from 'src/app/services/login.service';
import { RedeemService } from 'src/app/services/redeem.service';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {

  userId?: String;
  points?: number;
  tokenBalance?: String;
  user?: GeneralUser;
  redeemable: number = 0;
  transactionUrl?: string;
  isLoading: boolean = false;
  



  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private loginService: LoginService, private redeemService: RedeemService) { }

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(){
    // Fetch the user details from the service
    this.user = this.loginService.getGeneralUser();
    console.log(this.user);
    // Check if the user details are not empty/null
    if (this.user) {

      this.points = this.user.points;
      this.userId = this.user._id;
      this.tokenBalance = this.user.tokenBalance;
      this.redeemable = this.points - (this.points % 100);

    } else {
      console.log('No user details found or invalid data returned.'); // Log if no user details are found
    }
  }  


  redeemPoints(){
    this.isLoading = true;
    const params = { userId: this.userId };
    this.redeemService.redeemPoints(params).subscribe((response) => {
      // Add your code here
      const remainingPoints = response.redeemedPoints;
      const transactionHash = remainingPoints.transactionHash;

      if (this.points && remainingPoints.points) {
        this.points = remainingPoints.points;
      }
      
      if (this.redeemable && remainingPoints.points) {
        this.redeemable = 0;
      }

      this.transactionUrl = `https://mumbai.polygonscan.com/tx/${transactionHash}`;

      // Log the response

      // Set the loading state to false
      this.isLoading = false;
    });
    
  }
}
