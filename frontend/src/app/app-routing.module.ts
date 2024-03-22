import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationPageComponent} from './pages/registration-page/registration-page.component';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {EventsPageComponent} from './pages/events-page/events-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {PrcAdminComponent} from "./pages/prc-admin-page/prc-admin/prc-admin.component";
import {
  DriverRegistrationComponent
} from "./components/prc/driver-registration/driver-registration/driver-registration.component";
import {ViewPrcListComponent} from "./components/prc/prc-registration/view-prc-list/view-prc-list.component";
import {
  ViewDrivesListComponent
} from "./components/prc/driver-registration/view-drives-list/view-drives-list.component";


const routes: Routes = [
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'event', component: EventsPageComponent},
  {path: 'login-page', component: LoginPageComponent},
  {path: 'create-driver', component: DriverRegistrationComponent},
  {path: 'view-drivers', component: ViewDrivesListComponent},
  {path: 'prc-admin', component: PrcAdminComponent},
  {path: 'prc-list', component: ViewPrcListComponent},
  {path: '', component: LandingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
