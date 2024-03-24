import { Injectable } from '@angular/core';
import { GeneralUser } from '../interfaces/generalUser';
import { PRC } from '../interfaces/PRC';
import { MC } from '../interfaces/MC';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public GeneralUser?: GeneralUser;
  public PRC?: PRC;
  public MC?: MC;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { 
    
  }
  // General User
  setGeneralUser(user: GeneralUser) {
    this.GeneralUser = user;
  }

  getGeneralUser() {
    return this.GeneralUser;
  }

  // PRC
  setPRC(user: PRC) {
    this.PRC = user;
  }

  getPRC() {
    return this.PRC;
  }

  // MC
  setMC(user: MC) {
    this.MC = user;
  }

  getMC() {
    return this.MC;
  }

  loginUser(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<GeneralUser>(`${this.apiUrl}/auth/login`, data, { headers: headers });
  }

}
