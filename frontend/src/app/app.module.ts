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
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
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
import { MyOrganizedEventsComponent } from './components/events/my-organized-events/my-organized-events.component';
import { HeaderComponent } from './shared/header/header.component';
import { OrganizedEventPageComponent } from './pages/organized-event-page/organized-event-page.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { ReportGarbageComponent } from './components/report/report-garbage/report-garbage.component';
import { ReportComplaintComponent } from './components/report/report-complaint/report-complaint.component';

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
    MyOrganizedEventsComponent,
    HeaderComponent,
    OrganizedEventPageComponent,
    ReportGarbageComponent,
    ReportPageComponent,
    ReportComplaintComponent
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
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
