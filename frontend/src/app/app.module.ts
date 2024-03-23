import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';


import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { PrcRegistrationComponent } from './components/prc/prc-registration/prc-registration.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { OrganizeEventComponent } from './components/events/organize-event/organize-event.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { McRegistrationComponent } from './components/mc/mc-registration/mc-registration.component';
import { ViewEventComponent } from './components/events/view-event/view-event.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { GeneralUserHomepageComponent } from './pages/general-user-homepage/general-user-homepage.component';
import { PrcAdminHomepageComponent } from './pages/prc-admin-homepage/prc-admin-homepage.component';
import { McAdminHomepageComponent } from './pages/mc-admin-homepage/mc-admin-homepage.component';
import { MyEventsComponent } from './components/events/my-events/my-events.component';
import { ParticipationComponent } from './components/events/participation/participation.component';
import { HeaderComponent } from './shared/header/header.component';
import { OrganizedEventPageComponent } from './pages/organized-event-page/organized-event-page.component';
import { MyEventPageComponent } from './pages/my-event-page/my-event-page.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { ReportGarbageComponent } from './components/report/report-garbage/report-garbage.component';
import { ReportComplaintComponent } from './components/report/report-complaint/report-complaint.component';
import { DashbordComponent } from './pages/public/dashbord/dashbord.component';
import { HistoryComponent } from './pages/public/history/history.component';
import { PickupComponent } from './pages/public/pickup/pickup.component';
import { LocationComponent } from './pages/public/location/location.component';
import { PriceChartComponent } from './pages/public/price-chart/price-chart.component';
import { PrcDriverDashboardComponent } from './pages/prc-driver-page/prc-driver-dashboard/prc-driver-dashboard.component';
import { PrcDriverPendingPickupsComponent } from './pages/prc-driver-page/prc-driver-pending-pickups/prc-driver-pending-pickups.component';
import { PrcDriverPickupConfirmPageComponent } from './pages/prc-driver-page/prc-driver-pickup-confirm-page/prc-driver-pickup-confirm-page.component';
import { PrcDriverPriceChartComponent } from './pages/prc-driver-page/prc-driver-price-chart/prc-driver-price-chart.component';
import { PrcDriverPickupHitoryPageComponent } from './pages/prc-driver-page/prc-driver-pickup-hitory-page/prc-driver-pickup-hitory-page.component';
import { PrcDriverPickupViewPageComponent } from './pages/prc-driver-page/prc-driver-pickup-view-page/prc-driver-pickup-view-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    UserRegistrationComponent,
    PrcRegistrationComponent,
    PrcRegistrationComponent,
    EventsPageComponent,
    OrganizeEventComponent,
    LandingPageComponent,
    LoginPageComponent,
    OrganizeEventComponent,
    McRegistrationComponent,
    ViewEventComponent,
    GeneralUserHomepageComponent,
    PrcAdminHomepageComponent,
    McAdminHomepageComponent,
    MyEventsComponent,
    ParticipationComponent,
    HeaderComponent,
    OrganizedEventPageComponent,
    MyEventPageComponent,
    ReportGarbageComponent,
    ReportPageComponent,
    ReportComplaintComponent,
    DashbordComponent,
    PickupComponent,
    HistoryComponent,
    LocationComponent,
    PriceChartComponent,
    PrcDriverDashboardComponent,
    PrcDriverPendingPickupsComponent,
    PrcDriverPickupConfirmPageComponent,
    PrcDriverPriceChartComponent,
    PrcDriverPickupHitoryPageComponent,
    PrcDriverPickupViewPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
