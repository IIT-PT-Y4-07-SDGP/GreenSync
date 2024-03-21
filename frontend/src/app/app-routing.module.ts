import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashbordComponent } from './pages/public/dashbord/dashbord.component';
import { PickupComponent } from './pages/public/pickup/pickup.component';
import { LocationComponent } from './pages/public/location/location.component';
import { HistoryComponent } from './pages/public/history/history.component';
import { PriceChartComponent } from './pages/public/price-chart/price-chart.component';


const routes: Routes = [
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'event', component: EventsPageComponent },
  { path: 'login-page', component: LoginPageComponent },
  { path: '', component: LandingPageComponent },


  { path: 'public/dashboard', component: DashbordComponent },
  { path: 'public/pickup', component: PickupComponent },
  { path: 'public/location', component: LocationComponent },
  { path: 'public/history', component: HistoryComponent },
  { path: 'public/price-chart', component: PriceChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
