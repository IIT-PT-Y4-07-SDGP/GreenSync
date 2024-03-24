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
  public events: EventDetails[] = [];
  dataSource = new MatTableDataSource<ParticipantDetails>();
  eventId: string = "";
  constructor(private eventServices: EventService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const eventIdFromService = this.eventServices.getViewEventID();
    this.eventId = eventIdFromService !== undefined ? eventIdFromService : "";
    this.fetchEvents(this.eventId);
  }

  fetchEvents(eventId: string): void {
      // Make an HTTP request to fetch events from your server
    this.eventServices.getEvent(eventId).subscribe({
    next: event => {
      // Check if the event object is not empty/null
      if (event) {
        // Since you're fetching a single event, you can directly assign it to this.events
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
        console.log('No event found or invalid data returned.');
      }
    },
    error: err => {
      console.log(err);
    }
  });
  }

  getParticipatedCount(participants: any[]): number {
    if (!participants) return 0;
    return participants.filter(participant => participant.participationStatus === 'Participated').length;
  }



}
