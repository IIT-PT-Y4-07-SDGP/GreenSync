import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {DriverService} from "../../../../services/driver.service";

@Component({
  selector: 'app-driver-registration',
  templateUrl: './driver-registration.component.html',
  styleUrls: ['./driver-registration.component.scss']
})
export class DriverRegistrationComponent implements OnInit {
  driverRegFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private driverService: DriverService
  ) {
    this.driverRegFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+\d{11}$/)]],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    console.log();
  }

  onSubmit(): void {
    if (this.driverRegFormGroup.valid) {
      const formData = {
        firstName: this.driverRegFormGroup.value.firstName,
        lastName: this.driverRegFormGroup.value.lastName,
        address: this.driverRegFormGroup.value.address,
        account: {
          username: this.driverRegFormGroup.value.username,
          phoneNumber: this.driverRegFormGroup.value.phoneNumber,
          userRole: 'DRIVER',
          email: this.driverRegFormGroup.value.email,
          password: this.driverRegFormGroup.value.password,
        }
      }
      const jsonData = JSON.stringify(formData);

      this.driverService.registerDriver(jsonData).subscribe(() => {
        this.onClear();
        this.router.navigate(['prc-admin-homepage']);
      });
    }
  }

  onClear(): void {
    this.driverRegFormGroup.reset();
  }

  cancelSubmit() {
    this.router.navigate(['/prc-admin-homepage']);
  }

}
