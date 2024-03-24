import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from '../../../services/event.service';
import { EventDetails } from 'src/app/interfaces/event';
import { LoginService } from 'src/app/services/login.service';
import { OrganizeEventComponent } from '../organize-event/organize-event.component';
import { TokenVerificationDialogComponent } from '../token-verification-dialog/token-verification-dialog.component';
import { GeneralUser } from 'src/app/interfaces/generalUser';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {
  selectedButton: string = 'Participation'; // Default selected button
  showButton: boolean = true; // Flag to control the visibility of the button
  eventResponse: any; // Property to hold the response from the server
  eventParticipationResponse: any; // Property to hold the response from the server
  public events: EventDetails[] = [];
  public participatedEvents: any[] = [];
  public userID?: string;
  public isAttendButtonDisabled: boolean = false;
  public user?: GeneralUser
  
  selectButton(button: string) {
    this.selectedButton = button;
  }

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

  constructor(
    public dialog: MatDialog, 
    private eventService: EventService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.userID = this.loginService.getGeneralUser()?._id!;
    this.fetchOrganizingEvents(this.userID);
    this.fetchParticipatedEvents(this.userID);
    this.user = this.loginService.getGeneralUser();

  }

  fetchOrganizingEvents(eventOrganizer: string): void {
    this.eventService.getOrganizingEvents(eventOrganizer)
      .subscribe({
        next: events => {
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
        }, error: err => {
          console.log(err);
        }
    });
  }

  fetchParticipatedEvents(userID: string): void {
    this.eventService.getParticipateEvents(userID)
      .subscribe({
        next: response => {
          // Assign the retrieved participatedEvents to the component property
          this.participatedEvents = response.participatedEvents.map(event => ({
            _id: event._id,
            eventName: event.event.eventName,
            eventTime: event.event.eventTime,
            eventLocation: event.event.eventLocation,
            eventDescription: event.event.eventDescription,
            eventOrganizer: event.event.eventOrganizer,
            eventParticipant: event.event.eventParticipant,
            eventToken: event.event.eventToken,
            eventStatus: event.event.eventStatus,
            createdAt: event.event.createdAt,
            updatedAt: event.event.updatedAt,
            __v: event.event.__v
          }));
          console.log(this.participatedEvents);
        }, error: err => {
          console.log(err);
        }
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

  onClickStartEvents(event: string) {
    const eventId = event.toString();
    this.eventService.startEvent(eventId).subscribe({
      next: response => {
        console.log('Event started successfully:', response);
        this.eventResponse = response; // Save the response in the property
        this.showButton = false;
        this.ngOnInit
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

  // Function to handle the "Attend" button click event
  attendEvent(participatedEventId: string): void {
      const dialogRef = this.dialog.open(TokenVerificationDialogComponent, {
        width: '400px',
        data: { participatedEventId }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result.verificationStatus === 'verified') {
          this.verifyToken(participatedEventId, result.token);
        }
      });
    }

    // Function to call API for token verification
    verifyToken(participatedEventId: string, token: string): void {
      if(participatedEventId){
        console.log("i got executed");
        const params = {
          userID: this.userID,
          eventID: participatedEventId,
          token: token
        }

        this.eventService.verifyToken(params).subscribe({
          next: result => {
            console.log(result);
            if(result){
              alert("Token is verified. Thank you for participating the event");
            } else {
              alert("Invalid token. Please try again");
            }
            this.ngOnInit();
          },
          error: err => {
            console.log(err.error);
            alert(err.error.error)
          }
        })
      }
    }

    onClickView(eventID: string) {
      this.eventService.setViewEventID(eventID)
    }
}
