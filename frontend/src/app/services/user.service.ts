import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralUser } from '../interfaces/generalUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  apiUrl?:string|undefined|null;

  constructor(private http: HttpClient, private envService: EnvironmentService) {
    this.apiUrl = this.envService.getBaseURL();
  }

  registerUser(data: any): Observable<GeneralUser> {
    return this.http.post<GeneralUser>(`${this.apiUrl}/user/registration`, data, { headers: this.headers });
  }
}
