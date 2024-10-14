import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingDashboardComponent } from './billing-dashboard/billing-dashboard.component';
import { RoleGuardService } from '../core/services/role-guard.service';

const routes: Routes = [
  { path: 'dashboard', component: BillingDashboardComponent, canActivate: [RoleGuardService], data: { role: 'Facturacion' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
