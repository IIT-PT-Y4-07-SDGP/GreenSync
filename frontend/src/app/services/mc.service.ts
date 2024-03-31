import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MC } from '../interfaces/MC';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class McService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  apiUrl?:string;

  constructor(private http: HttpClient, private envService: EnvironmentService) { 
    this.apiUrl = this.envService.getBaseURL();
  }
      
  registerMC(data: any): Observable<MC> {
    return this.http.post<MC>(`${this.apiUrl}/mc/registration`, data, { headers: this.headers });
  }
}
