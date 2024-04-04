import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DumpService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  dumpCreate(dumpData: any) {
    return this.http.post<any>(`${this.apiUrl}/dump/create-dump`, dumpData, {headers: this.headers});
  }

  getDumpTypeList() {
    return this.http.get<any[]>(`${this.apiUrl}/dump/find-all-dumps`);
  }

}
