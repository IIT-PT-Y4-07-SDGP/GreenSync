import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAccessTokenFromCookie(): string {
    return this.cookieService.get('access_token');
  }

  getRefreshTokenFromCookie(): string {
    return this.cookieService.get('refresh_token');
  }

  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  getGpUser(username: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}/user/${username}`, { headers: headers })
  }

  getMCUser(username: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}/mc/${username}`, { headers: headers })
  }

  getPRCUser(username: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}/prc/${username}`, { headers: headers })
  }


}
