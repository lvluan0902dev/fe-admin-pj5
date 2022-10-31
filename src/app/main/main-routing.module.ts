import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SliderAddComponent } from './components/slider/slider-add/slider-add.component';
import { SliderEditComponent } from './components/slider/slider-edit/slider-edit.component';
import { SliderListComponent } from './components/slider/slider-list/slider-list.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'slider/list',
        component: SliderListComponent
      },
      {
        path: 'slider/add',
        component: SliderAddComponent
      },
      {
        path: 'slider/edit',
        component: SliderEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
