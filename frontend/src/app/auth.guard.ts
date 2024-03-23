import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private commonService: CommonService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    const accessToken = this.commonService.getAccessTokenFromCookie();
    const refreshToken = this.commonService.getRefreshTokenFromCookie();

    // Check if tokens are present and valid
    if (accessToken && refreshToken) {
      // Decode tokens and check validity
      const accessTokenData = this.commonService.decodeToken(accessToken);

      // Example: Check if access token is expired
      if (accessTokenData.exp * 1000 < Date.now()) {
        // Redirect to login page if access token is expired
        this.router.navigate(['/login']);
        return false;
      }

      // Extract user role from decoded access token
            const userRole=accessTokenData.UserInfo.role;

      // Route users based on their roles
      switch (userRole) {
        case 'GP':
          this.router.navigate(['/gp-dashboard']); // Example route for GP users
          break;
        case 'MC-ADMIN':
          this.router.navigate(['/mc-dashboard']); // Example route for MC-ADMIN users
          break;
        case 'PRC-ADMIN':
          this.router.navigate(['/prc-dashboard']); // Example route for PRC-ADMIN users
          break;
        default:
          // Redirect to login page for unknown roles
          this.router.navigate(['/login']);
          return false;
      }

      // Return true to allow access if tokens are present and valid
      return true;
    } else {
      // Redirect to login page if tokens are not present
      this.router.navigate(['/login']);
      return false;
    }
  }
}
