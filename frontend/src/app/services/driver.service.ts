import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {GeneralUser} from "../interfaces/generalUser";
import {Driver} from "../interfaces/driver";

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  registerDriver(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/user/registration`, userData, {headers: this.headers});
  }

  getDriversList() {
    return this.http.get<Driver[]>(`${this.apiUrl}/driver/driver-list`);
  }

}
