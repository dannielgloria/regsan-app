import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importación necesaria
import { BillingRoutingModule } from './billing-routing.module';
import { BillingDashboardComponent } from './billing-dashboard/billing-dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    BillingDashboardComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    FormsModule,           // Asegúrate de importar FormsModule
    ReactiveFormsModule    // Asegúrate de importar ReactiveFormsModule
  ]
})
export class BillingModule { }
