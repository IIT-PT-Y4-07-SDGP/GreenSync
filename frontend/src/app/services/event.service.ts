import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventDetails } from 'src/app/interfaces/event';
import { ParticipateEventsResponse } from '../interfaces/participationResponse';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public apiUrl?:string|undefined|null;
  public events: EventDetails[] = [];
  public viewedEventID?: string;

  constructor(private http: HttpClient, private envService: EnvironmentService) { 
    this.apiUrl = this.envService.getBaseURL();
  }

  setViewEventID(eventID: string){
    this.viewedEventID = eventID;
  }

  getViewEventID(){
    return this.viewedEventID;
  } 

  createEvent(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/events/organize-event`, data, { headers: this.headers });
  }

  getOrganizingEvents(eventOrganizer: string) {
    return this.http.get<EventDetails[]>(`${this.apiUrl}/events/get-my-organizing-events?organizerId=${eventOrganizer}`)
  }

  getParticipateEvents(userID: string) {
    return this.http.get<ParticipateEventsResponse>(`${this.apiUrl}/events/get-participated-events?participantId=${userID}`)
  }
  
  verifyToken(data: any) {
    return this.http.post<boolean>(`${this.apiUrl}/events/verify-event-token`, data, { headers: this.headers });
  }
  
  startEvent(eventId: string,) {
    return this.http.post(`${this.apiUrl}/events/start-event/${eventId}`, {})
  }
  
  getAllEvents(){
    return this.http.get<EventDetails[]>(`${this.apiUrl}/events/get-events`)
  }
  
  registerUserToEvent(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/events/participate`, data, { headers: this.headers });
  }
  
  getEvent(eventId: string){
    return this.http.get<EventDetails>(`${this.apiUrl}/events/get-event-total-registered?eventId=${eventId}`)
  }
  
  completeEvent(data: any){
    return this.http.post(`${this.apiUrl}/events/end-event`, data, { headers: this.headers })
  }
  
  deleteEvent(eventID: string, organizerID: string) {
    return this.http.delete(`${this.apiUrl}/events/delete-event?eventID=${eventID}&organizerID=${organizerID}`);
  }
}
