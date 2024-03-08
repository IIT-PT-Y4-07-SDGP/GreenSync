import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';


const routes: Routes = [
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'event', component: EventsPageComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
