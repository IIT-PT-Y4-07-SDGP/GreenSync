import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }
  createReportGarbage(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mc/report-garbage`, data, { headers: this.headers});
  }
}
