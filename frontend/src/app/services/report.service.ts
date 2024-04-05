import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public apiUrl?: string;

  constructor(private http: HttpClient, private envService: EnvironmentService) {
    this.apiUrl = this.envService.getBaseURL();
  }

  createReportGarbage(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mc/report-garbage`, data, { headers: this.headers});
  }
  createComplaint(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mc/create-complaint`, data, { headers: this.headers});
  }
}
