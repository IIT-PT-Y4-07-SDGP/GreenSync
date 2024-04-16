import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PRC } from 'src/app/interfaces/PRC';
import { Router } from '@angular/router';
import { PRCService } from 'src/app/services/prc.service';
@Component({
  selector: 'app-prc-registration',
  templateUrl: './prc-registration.component.html',
  styleUrls: ['./prc-registration.component.scss']
})
export class PrcRegistrationComponent implements OnInit {
  private destroy$: Subject<void> = new Subject();
  PRCRegFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private prcService: PRCService
  ) {
    this.PRCRegFormGroup = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
  });}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.PRCRegFormGroup = this.fb.group({
      prcName:['', Validators.required],
      BSRegNo:['', [Validators.required, BSRegValidator()]],
      address:['', Validators.required],
      district:['', Validators.required],
      username:['', Validators.required],
      email:['', [Validators.required , Validators.email]],
      phoneNumber:['', [Validators.required, Validators.pattern(/^\+\d{11}$/)]],
      password:['', [Validators.required, passwordValidator()]],
      passwordConfirmation:['', [Validators.required, confirmPasswordValidator('password'), passwordValidator()]]
    })
  }

  onRegister(){
    if (this.PRCRegFormGroup.valid) {
      // Construct the data object in the required format
      const formData = {
        PRCName: this.PRCRegFormGroup.value.prcName,
        PRCBusinessRegNumber: this.PRCRegFormGroup.value.BSRegNo,
        District: this.PRCRegFormGroup.value.district,
        Address: this.PRCRegFormGroup.value.address,
        account: {
          username: this.PRCRegFormGroup.value.username,
          phoneNumber: this.PRCRegFormGroup.value.phoneNumber,
          userRole: 'PRC-ADMIN', // Assuming this value is constant
          email: this.PRCRegFormGroup.value.email,
          password: this.PRCRegFormGroup.value.password,
        }
      }
      // Convert registrationData to JSON format
      const jsonData = JSON.stringify(formData);
      this.prcService.registerPRC(jsonData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next : response => {
            const PRC: PRC = response;
            this.prcService.setPRC(PRC);
            this.router.navigate(['admin/driver-manager'])
          },
          error: err => {
            alert(err.error.error);
            console.error('Error:', err);
          }
        });
    }
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

export function BSRegValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    // Business registration should be minimum 8 characters long and maximum 10 characters
    if (value.length < 8) {
      return { 'BSRegistrationMinimumLength': true };
    }
    if (value.length > 10) {
      return { 'BSRegistrationMaxLength': true };
    }
    return null;
  };
}
