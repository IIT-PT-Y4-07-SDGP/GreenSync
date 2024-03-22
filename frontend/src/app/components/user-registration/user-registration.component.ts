import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit, OnDestroy {
  selectedProfilePicture!: string;
  userRegFormGroup: FormGroup;
  private profilePicture!: File;
  private destroy$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder,
              private http: HttpClient) {
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
      const formData = {
        firstName: this.userRegFormGroup.value.firstName,
        lastName: this.userRegFormGroup.value.lastName,
        profilePic: this.profilePicture ? this.profilePicture : "Default",
        address: this.userRegFormGroup.value.address,
        account: {
          username: this.userRegFormGroup.value.username,
          phoneNumber: this.userRegFormGroup.value.phoneNumber,
          userRole: 'GP',
          email: this.userRegFormGroup.value.email,
          password: this.userRegFormGroup.value.password,
        }
      }
      const jsonData = JSON.stringify(formData);
      this.sendFormData(jsonData)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          response => {
            alert("Registration is successful");
            console.log(response);
          },
          error => {
            alert("Registration Failed :-(");
            console.error('Error:', error);
          }
        );
    }
  }

  private sendFormData(data: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>('http://localhost:5001/user/registration', data, {headers: headers});
  }
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    if (value.length < 8) {
      return {'minlength': true};
    }

    const regex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(value)) {
      return {'invalidPassword': true};
    }

    return null;
  };
}

export function confirmPasswordValidator(passwordControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.root.get(passwordControlName)?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : {'passwordMismatch': true};
  };

}
