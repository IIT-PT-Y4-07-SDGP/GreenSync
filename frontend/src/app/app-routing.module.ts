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
import { GeneralUserHomepageComponent } from './pages/general-user-homepage/general-user-homepage.component';
import { PrcAdminHomepageComponent } from './pages/prc-admin-homepage/prc-admin-homepage.component';
import { McAdminHomepageComponent } from './pages/mc-admin-homepage/mc-admin-homepage.component';
import { OrganizedEventPageComponent } from './pages/organized-event-page/organized-event-page.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },


  { path: 'public/dashboard', component: DashbordComponent },
  { path: 'public/pickup', component: PickupComponent },
  { path: 'public/location', component: LocationComponent },
  { path: 'public/history', component: HistoryComponent },
  { path: 'public/price-chart', component: PriceChartComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'user-homepage', component: GeneralUserHomepageComponent },
  { path: 'prc-admin-homepage', component: PrcAdminHomepageComponent },
  { path: 'mc-admin-homepage', component: McAdminHomepageComponent },
  { path: 'user-homepage/event', component: EventsPageComponent },
  { path: 'user-homepage/event/organized-event-page', component: OrganizedEventPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
