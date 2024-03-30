import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PRC } from '../interfaces/PRC';
import { environment } from 'src/environments/environment';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})

export class PrcService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  apiUrl?:string;

  constructor(private http: HttpClient, private envService: EnvironmentService) {
    this.apiUrl = this.envService.getBaseURL();
  }

  getPRCs() {
    return this.http.get<PRC[]>(`${this.apiUrl}/prc/prc-list`);
  }

  registerPRC(data: any): Observable<PRC> {
    return this.http.post<PRC>(`${this.apiUrl}/prc/registration`, data, { headers: this.headers });
  }

}
