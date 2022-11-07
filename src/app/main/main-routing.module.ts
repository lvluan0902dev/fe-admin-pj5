import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeautyImageAddComponent } from './components/beauty-image/beauty-image-add/beauty-image-add.component';
import { BeautyImageEditComponent } from './components/beauty-image/beauty-image-edit/beauty-image-edit.component';
import { BeautyImageListComponent } from './components/beauty-image/beauty-image-list/beauty-image-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SliderAddComponent } from './components/slider/slider-add/slider-add.component';
import { SliderEditComponent } from './components/slider/slider-edit/slider-edit.component';
import { SliderListComponent } from './components/slider/slider-list/slider-list.component';
import { TestimonialAddComponent } from './components/testimonial/testimonial-add/testimonial-add.component';
import { TestimonialEditComponent } from './components/testimonial/testimonial-edit/testimonial-edit.component';
import { TestimonialListComponent } from './components/testimonial/testimonial-list/testimonial-list.component';
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
        path: 'slider',
        children: [
          {
            path: '',
            component: SliderListComponent
          },
          {
            path: 'list',
            component: SliderListComponent
          },
          {
            path: 'add',
            component: SliderAddComponent
          },
          {
            path: 'edit/:id',
            component: SliderEditComponent
          }
        ]
      },
      {
        path: 'testimonial',
        children: [
          {
            path: '',
            component: TestimonialListComponent
          },
          {
            path: 'list',
            component: TestimonialListComponent
          },
          {
            path: 'add',
            component: TestimonialAddComponent
          },
          {
            path: 'edit/:id',
            component: TestimonialEditComponent
          }
        ]
      },
      {
        path: 'beauty-image',
        children: [
          {
            path: '',
            component: BeautyImageListComponent
          },
          {
            path: 'list',
            component: BeautyImageListComponent
          },
          {
            path: 'add',
            component: BeautyImageAddComponent
          },
          {
            path: 'edit/:id',
            component: BeautyImageEditComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
