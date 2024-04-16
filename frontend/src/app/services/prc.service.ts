import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PRC } from '../interfaces/PRC';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})

export class PRCService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  apiUrl?:string|undefined|null;
  PRC?: PRC;

  constructor(private http: HttpClient, private envService: EnvironmentService) {
    this.apiUrl = this.envService.getBaseURL();
  }
  // PRC
  setPRC(user: PRC) {
    this.PRC = user;
  }

  getPRC() {
    return this.PRC;
  }

  getPRCs() {
    return this.http.get<PRC[]>(`${this.apiUrl}/prc/prc-list`);
  }

  registerPRC(data: any): Observable<PRC> {
    return this.http.post<PRC>(`${this.apiUrl}/prc/registration`, data, { headers: this.headers });
  }

}
