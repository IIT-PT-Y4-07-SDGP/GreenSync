import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DumpService } from 'src/app/services/dump.service';
import { PickupService } from 'src/app/services/pickup.service';
import { dumpType } from '../../prc-admin/dump-type/dump-type.component';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { LoginService } from 'src/app/services/login.service';
import { log } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss']
})
export class PickupComponent implements OnInit {
  typeList: any[] = [];
  pickuFormGroup: FormGroup;
  public userDetails?: GeneralUser;
  constructor(
    private router: Router,
    private fb: FormBuilder,
     private dumpService: DumpService,
     private loginService: LoginService,
     private pickupService:PickupService) {

    this.pickuFormGroup = this.fb.group({
      pickupDate: ['', Validators.required],
      picupTimeStart: ['', [Validators.required]],
      pickupTimeEnd: ['', Validators.required],
      dumpType: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
   this.getDumpList();

    this.userDetails = this.loginService.getGeneralUser();
    console.log(this.userDetails);

  }

  getDumpList() {
    this.typeList=[];
    this.dumpService.getDumpTypeList().subscribe((dumps: any) => {
      this.typeList=dumps['allDumps'];
    });

  }

  onSubmit(): void {
    if (this.pickuFormGroup.valid) {
      const formData = {
        pickupDate: this.pickuFormGroup.value.pickupDate,
        picupTimeStart: this.pickuFormGroup.value.picupTimeStart,
        pickupTimeEnd: this.pickuFormGroup.value.pickupTimeEnd,
        dumpType: this.pickuFormGroup.value.dumpType,
        decription: this.pickuFormGroup.value.description,
        location: this.pickuFormGroup.value.location,
        customerId:this.userDetails?._id
      }
      console.log(formData);

      const jsonData = JSON.stringify(formData);

      this.pickupService.pickupCreate(jsonData).subscribe(() => {
        alert("Pickup Created Successfully");
        this.router.navigate(['/public/history']);
        this.onClear();
      });
    }
  }

  onClear(): void {
    this.pickuFormGroup.reset();
  }

}
