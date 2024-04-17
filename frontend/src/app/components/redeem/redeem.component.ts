import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { RedeemService } from 'src/app/services/redeem.service';
import { PointsService } from 'src/app/services/points.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html'
})
export class RedeemComponent implements OnInit {

  userId?: String;
  points?: number;
  tokenBalance?: String;
  user?: GeneralUser;
  redeemable: number = 0;
  transactionUrl?: string;
  isLoading: boolean = false;
  



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private userService: UserService, 
    private redeemService: RedeemService, 
    private pointsService: PointsService
  ) { }

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(){
    // Fetch the user details from the service
    this.user = this.userService.getGeneralUser();
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


  // redeemPoints(){
  //   this.isLoading = true;
  //   const params = { userId: this.userId };
  //   this.redeemService.redeemPoints(params).subscribe((response) => {
  //     // Add your code here
  //     const remainingPoints = response.redeemedPoints;
  //     const transactionHash = remainingPoints.transactionHash;

  //     if (this.points && remainingPoints.points) {
  //       this.points = remainingPoints.points;
  //     }
      
  //     if (this.redeemable && remainingPoints.points) {
  //       this.redeemable = remainingPoints.points - (remainingPoints.points % 100);
  //     }

  //     this.transactionUrl = `https://mumbai.polygonscan.com/tx/${transactionHash}`;

  //     // Log the response

  //     // Set the loading state to false
  //     this.isLoading = false;
  //   });
    
  // }

  redeemPoints(){
    this.isLoading = true;
    const params = { userId: this.userId };
    this.redeemService.redeemPoints(params).subscribe((response) => {
      const remainingPoints = response.redeemedPoints;
      const transactionHash = remainingPoints.transactionHash;
  
      if (transactionHash) {
        this.transactionUrl = `https://mumbai.polygonscan.com/tx/${transactionHash}`;
  
        if (remainingPoints.points) {
          this.points = remainingPoints.points;
          this.redeemable = remainingPoints.points - (remainingPoints.points % 100);
        }
      }
  
      this.isLoading = false;
      this.pointsService.changePoints(remainingPoints.points);
    });
  }
}
