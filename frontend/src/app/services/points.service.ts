import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeneralUser } from 'src/app/interfaces/generalUser';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private pointsSource = new BehaviorSubject(0);
  currentPoints = this.pointsSource.asObservable();

  constructor(private loginService: LoginService) { }

  fethUserDetails() {
    let userDetails: GeneralUser | undefined = this.loginService.getGeneralUser();
    this.changePoints(userDetails?.points || 0);
  }

  changePoints(points: number) {
    this.pointsSource.next(points);
  }
}
