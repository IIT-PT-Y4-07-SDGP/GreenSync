import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginFormGroup: FormGroup;
  private destroy$: Subject<void> = new Subject();
  constructor(private fb: FormBuilder, private http: HttpClient) { 
    this.loginFormGroup = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      userIdentity: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
      this.sendFormData(jsonData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          response => {
            alert("Login is successful");
            console.log("Response => ", response);
          },
          error => {
            alert("Login Failed :-(")
            console.error('Error:', error);
          }
        );
    }
  }

  private sendFormData(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('http://localhost:5001/auth/login', data, { headers: headers });
  }
}
