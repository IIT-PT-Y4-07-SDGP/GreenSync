import { Component, OnInit } from '@angular/core';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { PickupService } from 'src/app/services/pickup.service';
import { UserService } from 'src/app/services/user.service';

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
    this.pickupService.getPickupListByUserId(this.userDetails?._id).subscribe((dumps: any) => {
      console.log(dumps['findByCustomerId']);
      this.pickupList=dumps['findByCustomerId'];
    });


  }
}
