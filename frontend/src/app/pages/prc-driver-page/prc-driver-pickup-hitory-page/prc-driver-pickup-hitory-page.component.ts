import { Component, OnInit } from '@angular/core';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { PickupService } from 'src/app/services/pickup.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-prc-driver-pickup-hitory-page',
  templateUrl: './prc-driver-pickup-hitory-page.component.html',
  styleUrls: ['./prc-driver-pickup-hitory-page.component.scss']
})
export class PrcDriverPickupHitoryPageComponent implements OnInit {
  pickupList: any[] = [];
  panelOpenState:boolean=true;
  public userDetails?: GeneralUser;
  constructor(
    private pickupService:PickupService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    await this.getUser();
    await this.getPickupList();
  }

  getUser(){
    this.userDetails = this.userService.getGeneralUser();
  }
  getPickupList() {
    this.pickupList=[];
    this.pickupService.getPickupListByDriverId(2).subscribe((dumps: any) => {
    // this.pickupService.getPickupListByDriverId(this.userDetails?._id).subscribe((dumps: any) => {
      console.log(dumps['findByDirverId']);
      this.pickupList=dumps['findByDirverId'];
    });
  }



}
