import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  loginFormGroup: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginFormGroup = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit(): void {
    console.log("aa");

  }

  validateCredential() {
    if (this.loginFormGroup.valid) {
      // Construct the data object in the required format
      const formData = {
        userIdentity: this.loginFormGroup.value.userIdentity,
        password: this.loginFormGroup.value.password,
      }
      // Convert registrationData to JSON format
      const jsonData = JSON.stringify(formData);
    }
  }
}
