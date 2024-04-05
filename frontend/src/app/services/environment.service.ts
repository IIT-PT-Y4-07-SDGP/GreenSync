import { Injectable } from '@angular/core';
import BaseURL from '../enums/baseURL';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }
  
  private setBaseURL(backendURL: string){
    localStorage.setItem('backendURL', backendURL ?? ''); 
  }

  getBaseURL(){
    let baseURL = localStorage.getItem('backendURL');
    if (baseURL == null || baseURL == '') {
      baseURL = this.identifyBaseURL() ?? null;
    }
    return baseURL;
  }

  public identifyBaseURL(): string | undefined{
    // gets the frontend URL and only keep the base path
    const frontendURL = window.location.href.split('/').slice(0, 3).join('/');
    console.log(frontendURL);
    // Check the frontend URL and return the corresponding backend URL
    switch (frontendURL) {
      case BaseURL.FE_PRODUCTION: 
        console.log("Production URL detected!");
        this.setBaseURL(BaseURL.BE_PRODUCTION);
        return BaseURL.BE_PRODUCTION; // Return the production URL

      case BaseURL.FE_DEVELOPMENT:
        console.log("Development URL detected!");
        this.setBaseURL(BaseURL.BE_DEVELOPMENT);
        return BaseURL.BE_DEVELOPMENT; // Return the development URL

      case BaseURL.FE_LOCALHOST:
        console.log("Localhost detected!");
        this.setBaseURL(BaseURL.BE_LOCALHOST);
        return BaseURL.BE_LOCALHOST; // Return the localhost URL
        
      default:
        console.error('Unknown frontend URL:', frontendURL);
        return undefined;
    }
  }
}
