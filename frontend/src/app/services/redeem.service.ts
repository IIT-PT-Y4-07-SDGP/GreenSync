import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralUser } from '../interfaces/generalUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedeemService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { } // Inject the HttpClient module

  redeemPoints(data: any){
    return this.http.post<GeneralUser>(`${this.apiUrl}/user/redeemPoints`, data, { headers: this.headers });
  }
}
