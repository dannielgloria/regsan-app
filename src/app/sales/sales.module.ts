import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';
import { ViewEditProcessesComponent } from './view-edit-processes/view-edit-processes.component';
import { ViewEditTechnicalDataComponent } from './view-edit-technical-data/view-edit-technical-data.component';


@NgModule({
  declarations: [
    SalesDashboardComponent,
    ViewEditProcessesComponent,
    ViewEditTechnicalDataComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
