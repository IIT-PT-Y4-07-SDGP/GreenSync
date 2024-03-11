import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mc-registration',
  templateUrl: './mc-registration.component.html',
  styleUrls: ['./mc-registration.component.scss']
})
export class McRegistrationComponent implements OnInit {
  private destroy$: Subject<void> = new Subject();
  MCRegFormGroup: FormGroup;  

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.MCRegFormGroup = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
   });}

   ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.MCRegFormGroup = this.fb.group({
      mcName:['', Validators.required],
      address:['', Validators.required],
      district:['', Validators.required],
      username:['', Validators.required],
      email:['', [Validators.required , Validators.email]],
      phoneNumber:['', [Validators.required, Validators.pattern(/^\+\d{11}$/)]],
      password:['', [Validators.required, passwordValidator()]],
      passwordConfirmation:['', [Validators.required, confirmPasswordValidator('password'), passwordValidator()]]
    });
  }

  onRegister(){
    if (this.MCRegFormGroup.valid) {
      // Construct the data object in the required format
      const formData = {
        MCName: this.MCRegFormGroup.value.mcName,
        District: this.MCRegFormGroup.value.district,
        Address: this.MCRegFormGroup.value.address,
        account: {
          username: this.MCRegFormGroup.value.username,
          phoneNumber: this.MCRegFormGroup.value.phoneNumber,
          email: this.MCRegFormGroup.value.email,
          password: this.MCRegFormGroup.value.password
        }
      }
      // Convert registrationData to JSON format
      const jsonData = JSON.stringify(formData);
      this.sendFormData(jsonData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          alert("Registration is successful");
        },
        error => {
          alert("Registration Failed :-(");
          console.error('Error:', error);
        }
      );
    }
  }

  private sendFormData(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(data);
    return this.http.post<any>('http://localhost:5001/mc/registration', data, { headers: headers });
  }
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    // Password should be minimum 8 characters long
    if (value.length < 8) {
      return { 'minlength': true };
    }

    // Password should contain at least one special character, one lowercase letter, one uppercase letter, and one number
    const regex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(value)) {
      return { 'invalidPassword': true };
    }

    return null;
  };
}

export function confirmPasswordValidator(passwordControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.root.get(passwordControlName)?.value;
    const confirmPassword = control.value;

    // Check if passwords match
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  };
}
