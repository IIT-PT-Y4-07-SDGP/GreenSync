import { Injectable } from '@angular/core';
import { GeneralUser } from '../interfaces/generalUser';
import { PRC } from '../interfaces/PRC';
import { MC } from '../interfaces/MC';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public GeneralUser?: GeneralUser;
  public PRC?: PRC;
  public MC?: MC;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  
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
    
    return this.http.post<any>(`${this.apiUrl}/auth/login`, data, { headers: headers })
    .pipe(
      tap(response => {
        this.cookieService.set('access_token', response.account.accessToken);
        this.cookieService.set('refresh_token', response.account.refreshToken);
      })
    );
  }

  getAccessTokenFromCookie(): string {
    return this.cookieService.get('access_token');
  }

  getRefreshTokenFromCookie(): string {
    return this.cookieService.get('refresh_token');
  }

  decodeAccessToken(accessToken: string): any {
    return jwtDecode(accessToken);
  }

  getGpUser(username: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}/user/${username}`, { headers: headers })
  }
}
