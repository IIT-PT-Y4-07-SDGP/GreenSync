import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PickupService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  pickupCreate(data: any) {
    return this.http.post<any>(`${this.apiUrl}/pickup/request-for-pickup`, data, {headers: this.headers});
  }

  getPickupTypeList() {
    return this.http.get<any[]>(`${this.apiUrl}/pickup/find-all-pickups`);
  }

  getPickupListByUserId(id:any) {
    return this.http.get<any[]>(`${this.apiUrl}/pickup/find-pickups-by-customerId/`+id);
}


  getPickupListByDriverId(id:any) {
    return this.http.get<any[]>(`${this.apiUrl}/pickup/find-pickups-by-driverId/`+id);
  }
  updateLocation(data: any) {
    return this.http.post<any>(`${this.apiUrl}/pickup/request-for-pickup`, data, {headers: this.headers});
  }
}
