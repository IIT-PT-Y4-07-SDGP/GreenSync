import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {GeneralUser} from 'src/app/interfaces/generalUser';
import {LoginService} from 'src/app/services/login.service';
import {Router} from '@angular/router';
import {UserService} from 'src/app/services/user.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit, OnDestroy {
  private profilePicture!: File;
  private destroy$: Subject<void> = new Subject();
  selectedProfilePicture!: string;
  userRegFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) {
    this.userRegFormGroup = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.userRegFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+\d{11}$/)]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, passwordValidator()]],
      passwordConfirmation: ['', [Validators.required, confirmPasswordValidator('password'), passwordValidator()]]
    })
    this.selectedProfilePicture = "app/assets/default-male-profile-picture.jpg"
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const component = this;
    const label = document.querySelector('label[for="fileInput"]');

    label?.addEventListener('click', function (event) {
      event.preventDefault()
      fileInput.click();
    });
    fileInput.setAttribute('multiple', 'false');
    fileInput.setAttribute('accept', 'image/*');

    fileInput?.addEventListener('change', function (this: HTMLInputElement, event: Event) {
      const fileNameDisplay = document.getElementById('fileName');
      const selectedFile = (event.target as HTMLInputElement).files?.[0];
      if (selectedFile) {
        if (fileNameDisplay) {
          fileNameDisplay.textContent = selectedFile.name;
          fileNameDisplay?.classList.add('visible');
        }
        component.profilePicture = selectedFile;
        component.onFileSelected(selectedFile);
      } else {
        if (fileNameDisplay) {
          fileNameDisplay.textContent = '';
          fileNameDisplay.classList.remove('visible');
        }
      }
    })
  }

  onFileSelected(file: File) {
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      if (file.size > 500 * 1024) {
        alert('Image size should be less than or equal to 500KB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedProfilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onRegister() {
    if (this.userRegFormGroup.valid) {
      // Construct the data object in the required format
      const formData = {
        firstName: this.userRegFormGroup.value.firstName,
        lastName: this.userRegFormGroup.value.lastName,
        profilePic: this.profilePicture ? this.profilePicture : "Default",
        address: this.userRegFormGroup.value.address,
        account: {
          username: this.userRegFormGroup.value.username,
          phoneNumber: this.userRegFormGroup.value.phoneNumber,
          userRole: 'GP', // Assuming this value is constant
          email: this.userRegFormGroup.value.email,
          password: this.userRegFormGroup.value.password,
        }
      }
      // Convert registrationData to JSON format
      const jsonData = JSON.stringify(formData);
      this.userService.registerUser(jsonData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: response => {
            this.loginService.setGeneralUser(response);
            this.router.navigate(['/user-homepage']);
          },
          error: err =>{
            alert(err.error.error)
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
