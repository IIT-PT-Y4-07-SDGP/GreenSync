import { Injectable } from '@angular/core';
import { GeneralUser } from '../interfaces/generalUser';
import { PRC } from '../interfaces/PRC';
import { MC } from '../interfaces/MC';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public GeneralUser?: GeneralUser;
  public PRC?: PRC;
  public MC?: MC;

  constructor(private http: HttpClient, private envService: EnvironmentService) { }
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
    return this.http.post<GeneralUser>(`${this.envService.getBaseURL()}/auth/login`, data, { headers: headers });
  }
}
