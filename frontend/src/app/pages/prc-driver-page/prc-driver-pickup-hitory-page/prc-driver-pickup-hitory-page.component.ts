import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { LoginService } from 'src/app/services/login.service';
import { PickupService } from 'src/app/services/pickup.service';

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
    private loginService: LoginService,
    private pickupService:PickupService
  ) { }

  async ngOnInit() {
    await this.getUser();
    await this.getPickupList();
  }

  getUser(){
    this.userDetails = this.loginService.getGeneralUser();
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
