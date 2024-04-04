import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { LoginService } from 'src/app/services/login.service';
import { PickupService } from 'src/app/services/pickup.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
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
    this.pickupService.getPickupListByUserId(this.userDetails?._id).subscribe((dumps: any) => {
      console.log(dumps['findByCustomerId']);
      this.pickupList=dumps['findByCustomerId'];
    });


  }
}
