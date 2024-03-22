import { Component, OnInit } from '@angular/core';
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
  eventId: string = '';
  constructor(private eventServices: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.eventId = params['id'];
    });
  }

  fetchEvents(eventId: string): void {
      // Make an HTTP request to fetch events from your server
    this.eventServices.getEvent(eventId).subscribe({
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


  // totalRegistered(event.eventParticipant) {
  //   totalRegistered = event.eventParticipant.participants.length;
  // }
}
