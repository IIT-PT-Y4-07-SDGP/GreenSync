import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralUser } from '../interfaces/generalUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registerUser(data: any): Observable<GeneralUser> {
    return this.http.post<GeneralUser>(`${this.apiUrl}/user/registration`, data, { headers: this.headers });
  }
}
