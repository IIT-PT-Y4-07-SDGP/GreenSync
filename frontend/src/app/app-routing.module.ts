import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { GeneralUserHomepageComponent } from './pages/general-user-homepage/general-user-homepage.component';
import { PrcAdminHomepageComponent } from './pages/prc-admin-homepage/prc-admin-homepage.component';
import { McAdminHomepageComponent } from './pages/mc-admin-homepage/mc-admin-homepage.component';


const routes: Routes = [
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'event', component: EventsPageComponent },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'user-homepage', component: GeneralUserHomepageComponent },
  { path: 'prc-admin-homepage', component: PrcAdminHomepageComponent },
  { path: 'mc-admin-homepage', component: McAdminHomepageComponent },
  { path: '', component: LandingPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
