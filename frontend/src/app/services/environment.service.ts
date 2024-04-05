import { Injectable } from '@angular/core';
import BaseURL from '../enums/baseURL';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  BaseURL?:string;

  constructor() { }
  
  private setBaseURL(backendURL: string){
    this.BaseURL = backendURL;
  }

  getBaseURL(){
    return this.BaseURL;
  }

  public identifyBaseURL(URL: string){
    console.log(URL);
    switch (URL) {
      case BaseURL.FE_PRODUCTION:
        console.log("Production URL detected!");
        this.setBaseURL(BaseURL.BE_PRODUCTION);
        break;
      case BaseURL.FE_DEVELOPMENT:
        console.log("Development URL detected!");
        this.setBaseURL(BaseURL.BE_DEVELOPMENT);
        break;
      case BaseURL.FE_LOCALHOST:
        console.log("Localhost detected!");
        this.setBaseURL(BaseURL.BE_LOCALHOST);
        break;
      default:
        console.error('Unknown frontend URL:', URL);
        break;
    }
  }
}
