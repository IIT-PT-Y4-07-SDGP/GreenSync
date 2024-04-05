import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralUser } from '../interfaces/generalUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class RedeemService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  apiUrl?:string;

  constructor(private http: HttpClient, private envService: EnvironmentService) { 
    this.apiUrl = this.envService.getBaseURL();
  }

  redeemPoints(data: any){
    return this.http.post<GeneralUser>(`${this.apiUrl}/user/redeemPoints`, data, { headers: this.headers });
  }
}
