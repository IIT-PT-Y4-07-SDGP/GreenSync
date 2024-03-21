import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from 'src/app/interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public apiUrl = environment.apiUrl;
  public events: Event[] = [];

  constructor(private http: HttpClient) { }

  createEvent(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/events/organize-event`, data, { headers: this.headers });
  }

  getOrganizingEvents(eventOrganizer: string){
    // Make an HTTP request to fetch events from your server
    this.http.get<Event[]>(`${this.apiUrl}/events/get-my-organizing-events?organizerId=${eventOrganizer}`)
      .subscribe(events => {
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
  startEvent(eventId:string, ){
    return this.http.post(`${this.apiUrl}/events/start-event/${eventId}`, {})
  } 
}
