import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({

  
  selector: 'app-report-garbage',
  templateUrl: './report-garbage.component.html',
  styleUrls: ['./report-garbage.component.scss']
})
export class ReportGarbageComponent implements OnInit {

  selectedReportPictures: File[] = [];
  reportForm: FormGroup;
  private destroy$: Subject<void> = new Subject();
  dialogRef: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
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
    }); // Assuming selectedReportPictures is an array to hold multiple selected files

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
            this.selectedReportPictures.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }
    
    
  

  onSubmit() {
    // Close the dialog after submission
    const timestamp = this.convertToTimestamp(
      this.reportForm.value.eventDate,
      this.reportForm.value.eventTime
    );

    if (this.reportForm.valid) {
      // Construct the data object in the required format
      const formData = {
        reportTitle: this.reportForm.value.reportTitle,
        reportTime: timestamp,
        reportLocation: this.reportForm.value.reportLocation,
        reportDescription: this.reportForm.value.reportDescription,
        reportOrganizer: '65e873e15a9d6183a4670244',
      };
      // Convert registrationData to JSON format
      const jsonData = JSON.stringify(formData);
      console.log(jsonData);
      // this.sendFormData(jsonData)
      // .pipe(takeUntil(this.destroy$))
      // .subscribe(
      //   response => {
      //     console.log('Response from backend:', response);
      //     alert("Event Created Successfully");
      //     this.dialogRef.close();
      //   },
      //   error => {
      //     alert(error.error.error);
      //     console.error('Error:', error);
      //   }
      // );
    }
  }

  // private sendFormData(data: any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   console.log(data);
  //   return this.http.post<any>('http://localhost:5001/events/organize-event', data, { headers: headers });
  // }

  onCancel() {
    // Close the dialog without saving
    this.dialogRef.close();
  }

  private convertToTimestamp(dateString: string, timeString: string): string {
    const combinedDateTimeString = `${dateString} ${timeString}`;

    // Create a Date object
    const dateTime = new Date(combinedDateTimeString);

    // Get the timestamp in milliseconds
    const timestamp = dateTime.getTime();

    // Convert to ISO string format (e.g., "2024-04-06T07:00:00.000Z")
    const isoString = dateTime.toISOString();

    return isoString;
  }
}
