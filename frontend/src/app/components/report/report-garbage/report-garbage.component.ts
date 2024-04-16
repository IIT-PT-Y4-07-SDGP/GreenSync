import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-report-garbage',
  templateUrl: './report-garbage.component.html',
  styleUrls: ['./report-garbage.component.scss']
})
export class ReportGarbageComponent implements OnInit {

  selectedReportPictures: File[] = [];
  reportForm: FormGroup;
  public userDetails?: GeneralUser;
  private destroy$: Subject<void> = new Subject();
  dialogRef: any;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private reportService: ReportService
  ) {  
    this.reportForm = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      reportTitle: ['', [Validators.required]],
      reportLocation: ['', [Validators.required]],
      reportDate: [null, [Validators.required]],
      reportTime: [null, [Validators.required]],
      reportDescription: ['', [Validators.maxLength(1000)]],
    });
    this.userDetails = this.userService.getGeneralUser(); // Assuming selectedReportPictures is an array to hold multiple selected files

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const label = document.querySelector('label[for="fileInput"]');
    label?.addEventListener('click', function (event) {
      event.preventDefault();
      fileInput.click();
    });


    // Other initialization code remains the same

    fileInput?.addEventListener('change', (event: Event) => {
      const selectedFiles = (event.target as HTMLInputElement).files;
      if (selectedFiles) {
        if (selectedFiles.length > 6) {
          alert('You can only select up to six images. First six images would be added');
          return;
        }
        this.selectedReportPictures = []; // Clear selected pictures before adding new ones
        for (let i = 0; i < selectedFiles.length; i++) {
          const selectedFile = selectedFiles[i];
          this.onFileSelected(selectedFile);
        }
      }
    });
  }

  onFileSelected(event: any) {
    const files = event?.target?.files;
    if (files) {
      this.selectedReportPictures = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) {
          alert('Please select an image file.');
          continue;
        }
        if (file.size > 5000 * 1024) { // Changed file size limit to 5MB
          alert('Image size should be less than or equal to 5MB.');
          continue;
        }
        if (this.selectedReportPictures.length >= 6) {
          alert('You can only select up to six images. First six images would be added');
          break;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const imageDataUrl = e.target.result;
          this.selectedReportPictures.push(imageDataUrl);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit() {
    // Close the dialog after submission
    const timestamp = this.convertToTimestamp(
      this.reportForm.value.reportDate,
      this.reportForm.value.reportTime
    );

    if (this.reportForm.valid) {
      // Construct the data object in the required format
      const formData = {
        reportTitle: this.reportForm.value.reportTitle,
        reportTime: timestamp,
        reportLocation: this.reportForm.value.reportLocation,
        reportDescription: this.reportForm.value.reportDescription,
        reportAuthor: this.userDetails?._id,
        reportPictures: JSON.stringify(this.selectedReportPictures),
      };
      // Convert registrationData to JSON format
      const jsonData = JSON.stringify(formData);
      console.log(jsonData);
      this.reportService.createReportGarbage(jsonData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          console.log('Response from backend:', response);
          alert("Your Report Submitted Successfully");
    },
    error: err => {
      alert(err.error.error);
      console.error('Error:', err);
    }
  });
}
}

  onCancel() {
    // Close the dialog without saving
    this.dialogRef.close();
  }

  private convertToTimestamp(dateString: string, timeString: string): string {
    const combinedDateTimeString = `${dateString} ${timeString}`;
    const dateTime = new Date(combinedDateTimeString); // Create a Date object
    const isoString = dateTime.toISOString(); // Convert to ISO string format (e.g., "2024-04-06T07:00:00.000Z")
    return isoString;
  }
}
