import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventService } from 'src/app/services/event.service';



@Component({
  selector: 'app-organize-event',
  templateUrl: './organize-event.component.html',
  styleUrls: ['./organize-event.component.scss']
})


export class OrganizeEventComponent implements OnInit {
  eventForm: FormGroup;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder, 
    public dialogRef: MatDialogRef<OrganizeEventComponent>, 
    private eventService: EventService
  ) { 
    this.eventForm = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });}
    ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }
  
  ngOnInit(): void {
    this.eventForm = this.fb.group({
      eventName: ['', [Validators.required]],
      eventLocation: ['', [Validators.required,]],
      eventDate: [null, [Validators.required]],
      eventTime: [null, [Validators.required,]],
      evetnDescription: ['', [Validators.maxLength(1000)]]
    })

  }

  onSubmit() {
    // Close the dialog after submission
    const timestamp = this.convertToTimestamp(this.eventForm.value.eventDate, this.eventForm.value.eventTime);

    if (this.eventForm.valid) {
      // Construct the data object in the required format
      const formData = {
        eventName: this.eventForm.value.eventName,
        eventTime: timestamp,
        eventLocation: this.eventForm.value.eventLocation,
        eventDescription: this.eventForm.value.evetnDescription,
        eventOrganizer: '65f023dc098f881d9b7f9557'

      }
      // Convert registrationData to JSON format
      const jsonData = JSON.stringify(formData);
      console.log(jsonData);
      this.eventService.createEvent(jsonData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: response => {
            console.log('Response from backend:', response);
            alert("Event Created Successfully");
            this.dialogRef.close();
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
    
    // Create a Date object
    const dateTime = new Date(combinedDateTimeString);

    // Get the timestamp in milliseconds
    const timestamp = dateTime.getTime();

    // Convert to ISO string format (e.g., "2024-04-06T07:00:00.000Z")
    const isoString = dateTime.toISOString();

    return isoString;

  }

}
