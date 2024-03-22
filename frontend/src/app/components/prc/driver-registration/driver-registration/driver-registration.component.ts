import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-driver-registration',
  templateUrl: './driver-registration.component.html',
  styleUrls: ['./driver-registration.component.scss']
})
export class DriverRegistrationComponent implements OnInit {
  driverRegFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router
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

      this.sendFormData(jsonData).subscribe((response) => {
        console.log(response);
      } );
      this.onClear();
    }
  }

  onClear(): void {
    this.driverRegFormGroup.reset();
  }

  private sendFormData(data: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>('http://localhost:5001/user/registration', data, {headers: headers});
  }

  cancelSubmit() {
    this.router.navigate(['/prc-admin']);
  }
}
