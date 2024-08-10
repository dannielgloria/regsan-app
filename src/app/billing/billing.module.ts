import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingDashboardComponent } from './billing-dashboard/billing-dashboard.component';


@NgModule({
  declarations: [
    BillingDashboardComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule
  ]
})
export class BillingModule { }
