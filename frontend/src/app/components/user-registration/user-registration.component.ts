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
}