import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MC } from '../interfaces/MC';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class MCService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  apiUrl?:string|undefined|null;
  MC?: MC;

  constructor(private http: HttpClient, private envService: EnvironmentService) { 
    this.apiUrl = this.envService.getBaseURL();
  }
      
  // MC
  setMC(user: MC) {
    this.MC = user;
  }

  getMC() {
    return this.MC;
  }

  registerMC(data: any): Observable<MC> {
    return this.http.post<MC>(`${this.apiUrl}/mc/registration`, data, { headers: this.headers });
  }
}
