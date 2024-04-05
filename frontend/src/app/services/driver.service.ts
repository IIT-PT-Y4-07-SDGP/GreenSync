import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {GeneralUser} from "../interfaces/generalUser";
import {Driver} from "../interfaces/driver";
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  apiUrl?:string|undefined|null;

  constructor(private http: HttpClient, private envService: EnvironmentService) {
    this.apiUrl = this.envService.getBaseURL();
  }

  registerDriver(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/user/registration`, userData, {headers: this.headers});
  }

  getDriversList() {
    return this.http.get<Driver[]>(`${this.apiUrl}/prc/driver-list`);
  }

}
