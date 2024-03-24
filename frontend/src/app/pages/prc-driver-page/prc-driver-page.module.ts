import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrcDriverDashboardComponent } from './prc-driver-dashboard/prc-driver-dashboard.component';
import { PrcDriverPendingPickupsComponent } from './prc-driver-pending-pickups/prc-driver-pending-pickups.component';
import { PrcDriverPickupConfirmPageComponent } from './prc-driver-pickup-confirm-page/prc-driver-pickup-confirm-page.component';
import { PrcDriverPickupViewPageComponent } from './prc-driver-pickup-view-page/prc-driver-pickup-view-page.component';
import { PrcDriverPickupHitoryPageComponent } from './prc-driver-pickup-hitory-page/prc-driver-pickup-hitory-page.component';
import { PrcDriverPriceChartComponent } from './prc-driver-price-chart/prc-driver-price-chart.component';



@NgModule({
  declarations: [
    PrcDriverDashboardComponent,
    PrcDriverPendingPickupsComponent,
    PrcDriverPickupConfirmPageComponent,
    PrcDriverPickupViewPageComponent,
    PrcDriverPickupHitoryPageComponent,
    PrcDriverPriceChartComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PrcDriverPageModule { }
