import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { PickupService } from 'src/app/services/pickup.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  public userDetails?: GeneralUser;
  locationFormGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private pickupService:PickupService,
    private userService: UserService
  ) {
    this.locationFormGroup = this.fb.group({
      location: ['', Validators.required]
    });
   }
   async ngOnInit() {
    await this.getUser();
  }

  getUser(){
    this.userDetails = this.userService.getGeneralUser();
  }

  onSubmit(): void {
    if (this.locationFormGroup.valid) {
      const formData = {
        location: this.locationFormGroup.value.location,
        customerId:this.userDetails?._id
      }
      const jsonData = JSON.stringify(formData);

      this.pickupService.updateLocation(jsonData).subscribe(() => {
        this.onClear();

      });
    }

  }


  onClear(): void {
    this.locationFormGroup.reset();
  }
}
