import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageClientsComponent } from './manage-clients/manage-clients.component';
import { ManageProcessesComponent } from './manage-processes/manage-processes.component';
import { SearchProcessesComponent } from './search-processes/search-processes.component';
import { TechnicalDataComponent } from './technical-data/technical-data.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ManageClientsComponent,
    ManageProcessesComponent,
    SearchProcessesComponent,
    TechnicalDataComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
