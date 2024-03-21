import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { OrganizeEventComponent } from 'src/app/components/events/organize-event/organize-event.component';
import { LoginService } from 'src/app/services/login.service';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { Event } from 'src/app/interfaces/event';

@Component({
  selector: 'app-organizing',
  templateUrl: './organizing.component.html',
  styleUrls: ['./organizing.component.scss']
})
export class OrganizingComponent implements OnInit {
  public userDetails?: GeneralUser;
  public events: Event[] = [];
  constructor(public dialog: MatDialog, private http: HttpClient, private loginService: LoginService) { }

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
    this.userDetails = this.loginService.getGeneralUser()!;
    this.fetchOrganizingEvents(this.userDetails._id);
  }


  fetchOrganizingEvents(eventOrganizer: string): void {
    // Make an HTTP request to fetch events from your server
    this.http.get<Event[]>(`http://localhost:5001/events/get-my-organizing-events?organizerId=${eventOrganizer}`).subscribe(events => {
      // Assign the retrieved events to the component property
      this.events = events.map(event => ({
        _id: event._id,
        eventName: event.eventName,
        eventTime: event.eventTime,
        eventLocation: event.eventLocation,
        eventDescription: event.eventDescription,
        eventOrganizer: event.eventOrganizer,
        eventParticipant: event.eventParticipant,
        eventToken: event.eventToken,
        eventStatus: event.eventStatus,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
        __v: event.__v
      }));
    });
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
  

}
