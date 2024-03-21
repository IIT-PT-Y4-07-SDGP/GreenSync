import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrganizeEventComponent } from 'src/app/components/events/organize-event/organize-event.component';
import { Event } from 'src/app/interfaces/event';
import { EventService } from '../../../services/event.service';


@Component({
  selector: 'app-my-organized-events',
  templateUrl: './my-organized-events.component.html',
  styleUrls: ['./my-organized-events.component.scss']
})
export class MyOrganizedEventsComponent implements OnInit {
  
  showButton: boolean = true; // Flag to control the visibility of the button
  eventResponse: any; // Property to hold the response from the server
  public events: Event[] = [];
  constructor(
    public dialog: MatDialog, 
    private eventService: EventService
  ) { }

  public imagePaths: string[] = [
    'app/assets/event-list-img-1.jpg',
    'app/assets/event-list-img-2.jpg',
    'app/assets/event-list-img-3.jpg',
    'app/assets/event-list-img-4.jpg',
    'app/assets/event-list-img-5.jpg',
    'app/assets/event-list-img-6.jpg',
    'app/assets/event-list-img-7.jpg',
    'app/assets/event-list-img-8.jpg',
    'app/assets/event-list-img-9.jpg',
    'app/assets/event-list-img-10.jpg',
  ];

  ngOnInit(): void {
    const organizerId = '65f023dc098f881d9b7f9557';
    this.fetchOrganizingEvents(organizerId);
  }


  fetchOrganizingEvents(eventOrganizer: string): void {
    this.eventService.getOrganizingEvents(eventOrganizer)
  }

  formatDate(dateTime: string): string {
    return new Date(dateTime).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  }

    // Helper function to format time
  formatTime(dateTime: string): string {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  onClickOrganizeEvents(){
      this.openOrganizeEventDialog();
  }

  openOrganizeEventDialog(): void {
    const dialogRef = this.dialog.open(OrganizeEventComponent, {
      height: '600px',
      width: '1000px', // Adjust the width as needed
      // Add any other configuration options for your dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      // Handle any data or actions after the dialog is closed
    });
  }

  onClickStartEvents(event: string) {
    const eventId = event.toString();
    this.eventService.startEvent(eventId).subscribe({
      next: response => {
        console.log('Event started successfully:', response);
        this.eventResponse = response; // Save the response in the property
        this.showButton = false;
      }, 
      error: err => {
        console.error('Error starting event:', err);
        // Handle any error that occurred while starting the event
      }
    });
  }

  isEventStarted(event: any){
    return event.eventStatus === 'Started' && /^\d{6}$/.test(event.eventToken);
  }
}
