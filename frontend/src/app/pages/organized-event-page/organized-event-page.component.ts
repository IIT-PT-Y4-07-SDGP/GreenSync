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
  eventId: string = '65fca7debb560277cb2dfd26';
  constructor(private eventServices: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchEvents(this.eventId);
    // this.route.params.subscribe(params => {
    //   this.eventId = params['eventId'];
    //   console.log(this.eventId);
    // });
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
      } else {
        console.log('No event found or invalid data returned.');
      }
    },
    error: err => {
      console.log(err);
    }
  });
  }


  // totalRegistered(event.eventParticipant) {
  //   totalRegistered = event.eventParticipant.participants.length;
  // }
}
