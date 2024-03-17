import { Injectable } from '@angular/core';
import { GeneralUser } from '../interfaces/generalUser';
import { PRC } from '../interfaces/PRC';
import { MC } from '../interfaces/MC';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public GeneralUser?: GeneralUser;
  public PRC?: PRC;
  public MC?: MC;

  constructor() { 
    
  }
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


}
