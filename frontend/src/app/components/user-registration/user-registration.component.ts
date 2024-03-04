import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  selectedProfilePicture!: string;
  options: FormGroup;
  
  constructor(fb: FormBuilder) { 
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
  });}

  ngOnInit(): void {
    this.selectedProfilePicture="app/assets/default-male-profile-picture.jpg"
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
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
}