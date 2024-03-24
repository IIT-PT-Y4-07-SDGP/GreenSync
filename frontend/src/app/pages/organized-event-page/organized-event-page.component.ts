import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ParticipantDetails } from 'src/app/interfaces/participantsDetails';
import { EventDetails } from 'src/app/interfaces/event';
import { EventService } from '../../services/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organized-event-page',
  templateUrl: './organized-event-page.component.html',
  styleUrls: ['./organized-event-page.component.scss']
})
export class OrganizedEventPageComponent implements OnInit {
  public events: EventDetails[] = []; // Holds the details of the organized event
  dataSource = new MatTableDataSource<ParticipantDetails>(); // Data source for the table
  eventId: string = ""; // Holds the ID of the event

  constructor(private eventServices: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Fetch the event ID from the service
    const eventIdFromService = this.eventServices.getViewEventID();
    // Assign the fetched event ID to the component property
    this.eventId = eventIdFromService !== undefined ? eventIdFromService : "";
    // Fetch the details of the event using the event ID
    this.fetchEvents(this.eventId);
  }

  // Fetches the details of the event based on the provided event ID
  fetchEvents(eventId: string): void {
    // Make an HTTP request to fetch events from the server
    this.eventServices.getEvent(eventId).subscribe({
      next: event => {
        // Check if the event object is not empty/null
        if (event) {
          // Assign the fetched event to the component property
          this.events = [{
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
          }];
          console.log(event);
      } else {
          console.log('No event found or invalid data returned.'); // Log if no event is found
        }
      },
      error: err => {
        console.log(err); // Log any errors that occur during the HTTP request
      }
    });
  }

  // Returns the count of participants who have participated in the event
  getParticipatedCount(participants: any[]): number {
    if (!participants) return 0; // If participants array is empty or undefined, return 0
    // Filter the participants array based on participation status and return the count
    return participants.filter(participant => participant.participationStatus === 'Participated').length;
  }
}
