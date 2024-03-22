import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PRC } from '../interfaces/PRC';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PrcService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registerPRC(data: any): Observable<PRC> {
    return this.http.post<PRC>(`${this.apiUrl}/prc/registration`, data, { headers: this.headers });
  }

}
