import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicProcessesViewComponent } from './public-processes-view/public-processes-view.component';


@NgModule({
  declarations: [
    PublicProcessesViewComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
