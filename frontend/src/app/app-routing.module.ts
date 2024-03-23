import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { GeneralUserHomepageComponent } from './pages/general-user-homepage/general-user-homepage.component';
import { PrcAdminHomepageComponent } from './pages/prc-admin-homepage/prc-admin-homepage.component';
import { McAdminHomepageComponent } from './pages/mc-admin-homepage/mc-admin-homepage.component';
import { OrganizedEventPageComponent } from './pages/organized-event-page/organized-event-page.component';
import { MyEventPageComponent } from './pages/my-event-page/my-event-page.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { DashbordComponent } from './pages/public/dashbord/dashbord.component';
import { PickupComponent } from './pages/public/pickup/pickup.component';
import { LocationComponent } from './pages/public/location/location.component';
import { HistoryComponent } from './pages/public/history/history.component';
import { PriceChartComponent } from './pages/public/price-chart/price-chart.component';
import { PrcDriverDashboardComponent } from './pages/prc-driver-page/prc-driver-dashboard/prc-driver-dashboard.component';
import { PrcDriverPendingPickupsComponent } from './pages/prc-driver-page/prc-driver-pending-pickups/prc-driver-pending-pickups.component';
import { PrcDriverPickupConfirmPageComponent } from './pages/prc-driver-page/prc-driver-pickup-confirm-page/prc-driver-pickup-confirm-page.component';
import { PrcDriverPickupHitoryPageComponent } from './pages/prc-driver-page/prc-driver-pickup-hitory-page/prc-driver-pickup-hitory-page.component';
import { PrcDriverPriceChartComponent } from './pages/prc-driver-page/prc-driver-price-chart/prc-driver-price-chart.component';
import { PrcDriverPickupViewPageComponent } from './pages/prc-driver-page/prc-driver-pickup-view-page/prc-driver-pickup-view-page.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'user-homepage', component: GeneralUserHomepageComponent },
  { path: 'prc-admin-homepage', component: PrcAdminHomepageComponent },
  { path: 'mc-admin-homepage', component: McAdminHomepageComponent },
  { path: 'user-homepage/report', component: ReportPageComponent},
  { path: 'user-homepage/event', component: EventsPageComponent },
  { path: 'user-homepage/event/my-events', component: MyEventPageComponent },
  { path: 'user-homepage/event/my-events/organized-event-page', component: OrganizedEventPageComponent },

  { path: 'public/dashboard', component: DashbordComponent },
  { path: 'public/pickup', component: PickupComponent },
  { path: 'public/location', component: LocationComponent },
  { path: 'public/history', component: HistoryComponent },
  { path: 'public/price-chart', component: PriceChartComponent },

  { path: 'prc-driver/dashboard', component: PrcDriverDashboardComponent },
  { path: 'prc-driver/pending-pickups', component: PrcDriverPendingPickupsComponent },
  { path: 'prc-driver/confirm-pickup', component: PrcDriverPickupConfirmPageComponent },
  { path: 'prc-driver/pickup-history', component: PrcDriverPickupHitoryPageComponent },
  { path: 'prc-driver/price-chart', component: PrcDriverPriceChartComponent },
  { path: 'prc-driver/pickup-view', component: PrcDriverPickupViewPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
