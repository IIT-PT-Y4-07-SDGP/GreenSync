import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  selectedProfilePicture!: string;
  userRegFormGroup: FormGroup;
  
  constructor(private fb: FormBuilder) { 
    this.userRegFormGroup = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
  });}

  ngOnInit(): void {
    this.userRegFormGroup = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', [Validators.required , Validators.email]],
      username:['', Validators.required],
      phoneNumber:['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      password:['', [Validators.required, passwordValidator()]],
      passwordConfirmation:['', [Validators.required, confirmPasswordValidator('password')]]
    })
    this.selectedProfilePicture="app/assets/default-male-profile-picture.jpg"
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const component = this;
    const label = document.querySelector('label[for="fileInput"]');
    
    label?.addEventListener('click', function(event) {
      event.preventDefault()
      fileInput.click();
    });
    fileInput.setAttribute('multiple', 'false');
    fileInput.setAttribute('accept', 'image/*');
    
    fileInput?.addEventListener('change', function(this: HTMLInputElement, event: Event) {
      const fileNameDisplay = document.getElementById('fileName');
      const selectedFile = (event.target as HTMLInputElement).files?.[0];
      if (selectedFile) {
        if (fileNameDisplay){
          console.log(selectedFile.name);
          fileNameDisplay.textContent = selectedFile.name;
          fileNameDisplay?.classList.add('visible');
        }
        component.onFileSelected(selectedFile);
      } else {
        if(fileNameDisplay){
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

  onRegister(){
    if(this.userRegFormGroup.valid){
      console.log("hola");
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