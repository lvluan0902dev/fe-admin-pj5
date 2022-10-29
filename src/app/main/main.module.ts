import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SliderListComponent } from './components/slider/slider-list/slider-list.component';
import { SliderAddComponent } from './components/slider/slider-add/slider-add.component';
import { SliderEditComponent } from './components/slider/slider-edit/slider-edit.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    SliderListComponent,
    SliderAddComponent,
    SliderEditComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule
  ]
})
export class MainModule { }
