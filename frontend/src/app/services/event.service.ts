import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createEvent(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/events/organize-event`, data, { headers: this.headers });
  }

  
}
