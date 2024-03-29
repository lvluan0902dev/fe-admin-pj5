import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeInformationComponent } from './components/account/change-information/change-information.component';
import { BeautyImageAddComponent } from './components/beauty-image/beauty-image-add/beauty-image-add.component';
import { BeautyImageEditComponent } from './components/beauty-image/beauty-image-edit/beauty-image-edit.component';
import { BeautyImageListComponent } from './components/beauty-image/beauty-image-list/beauty-image-list.component';
import { BlogCategoryAddComponent } from './components/blog-category/blog-category-add/blog-category-add.component';
import { BlogCategoryEditComponent } from './components/blog-category/blog-category-edit/blog-category-edit.component';
import { BlogCategoryListComponent } from './components/blog-category/blog-category-list/blog-category-list.component';
import { BlogAddComponent } from './components/blog/blog-add/blog-add.component';
import { BlogEditComponent } from './components/blog/blog-edit/blog-edit.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { MessageComponent } from './components/contact-manage/message/message.component';
import { NotificationEmailComponent } from './components/contact-manage/notification-email/notification-email.component';
import { AddressComponent } from './components/contact-setting/address/address.component';
import { EmailComponent } from './components/contact-setting/email/email.component';
import { GoogleMapsComponent } from './components/contact-setting/google-maps/google-maps.component';
import { PhoneNumberComponent } from './components/contact-setting/phone-number/phone-number.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FaqAddComponent } from './components/faq/faq-add/faq-add.component';
import { FaqEditComponent } from './components/faq/faq-edit/faq-edit.component';
import { FaqListComponent } from './components/faq/faq-list/faq-list.component';
import { OrderCancelComponent } from './components/order/order-cancel/order-cancel.component';
import { OrderDoneComponent } from './components/order/order-done/order-done.component';
import { OrderNewComponent } from './components/order/order-new/order-new.component';
import { OrderTransportComponent } from './components/order/order-transport/order-transport.component';
import { ProductBrandAddComponent } from './components/product-brand/product-brand-add/product-brand-add.component';
import { ProductBrandEditComponent } from './components/product-brand/product-brand-edit/product-brand-edit.component';
import { ProductBrandListComponent } from './components/product-brand/product-brand-list/product-brand-list.component';
import { ProductCategoryAddComponent } from './components/product-category/product-category-add/product-category-add.component';
import { ProductCategoryEditComponent } from './components/product-category/product-category-edit/product-category-edit.component';
import { ProductCategoryListComponent } from './components/product-category/product-category-list/product-category-list.component';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { SliderAddComponent } from './components/slider/slider-add/slider-add.component';
import { SliderEditComponent } from './components/slider/slider-edit/slider-edit.component';
import { SliderListComponent } from './components/slider/slider-list/slider-list.component';
import { StaffAddComponent } from './components/staff/staff-add/staff-add.component';
import { StaffEditComponent } from './components/staff/staff-edit/staff-edit.component';
import { StaffListComponent } from './components/staff/staff-list/staff-list.component';
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
      },
      {
        path: 'faq',
        children: [
          {
            path: '',
            component: FaqListComponent
          },
          {
            path: 'list',
            component: FaqListComponent
          },
          {
            path: 'add',
            component: FaqAddComponent
          },
          {
            path: 'edit/:id',
            component: FaqEditComponent
          }
        ]
      },
      {
        path: 'contact-setting',
        children: [
          {
            path: 'address',
            component: AddressComponent
          },
          {
            path: 'phone-number',
            component: PhoneNumberComponent
          },
          {
            path: 'email',
            component: EmailComponent
          },
          {
            path: 'google-maps',
            component: GoogleMapsComponent
          }
        ]
      },
      {
        path: 'product-category',
        children: [
          {
            path: '',
            component: ProductCategoryListComponent
          },
          {
            path: 'list',
            component: ProductCategoryListComponent
          },
          {
            path: 'add',
            component: ProductCategoryAddComponent
          },
          {
            path: 'edit/:id',
            component: ProductCategoryEditComponent
          }
        ]
      },
      {
        path: 'product-brand',
        children: [
          {
            path: '',
            component: ProductBrandListComponent
          },
          {
            path: 'list',
            component: ProductBrandListComponent
          },
          {
            path: 'add',
            component: ProductBrandAddComponent
          },
          {
            path: 'edit/:id',
            component: ProductBrandEditComponent
          }
        ]
      },
      {
        path: 'staff',
        children: [
          {
            path: '',
            component: StaffListComponent
          },
          {
            path: 'list',
            component: StaffListComponent
          },
          {
            path: 'add',
            component: StaffAddComponent
          },
          {
            path: 'edit/:id',
            component: StaffEditComponent
          }
        ]
      },
      {
        path: 'contact-manage',
        children: [
          {
            path: 'message',
            component: MessageComponent
          },
          {
            path: 'notification-email',
            component: NotificationEmailComponent
          }
        ]
      },
      {
        path: 'product',
        children: [
          {
            path: '',
            component: ProductListComponent
          },
          {
            path: 'list',
            component: ProductListComponent
          },
          {
            path: 'add',
            component: ProductAddComponent
          },
          {
            path: 'edit/:id',
            component: ProductEditComponent
          }
        ]
      },
      {
        path: 'blog',
        children: [
          {
            path: '',
            component: BlogListComponent
          },
          {
            path: 'list',
            component: BlogListComponent
          },
          {
            path: 'add',
            component: BlogAddComponent
          },
          {
            path: 'edit/:id',
            component: BlogEditComponent
          }
        ]
      },
      {
        path: 'blog-category',
        children: [
          {
            path: '',
            component: BlogCategoryListComponent
          },
          {
            path: 'list',
            component: BlogCategoryListComponent
          },
          {
            path: 'add',
            component: BlogCategoryAddComponent
          },
          {
            path: 'edit/:id',
            component: BlogCategoryEditComponent
          }
        ]
      },
      {
        path: 'order',
        children: [
          {
            path: 'list-order-new',
            component: OrderNewComponent
          },
          {
            path: 'list-order-transport',
            component: OrderTransportComponent
          },
          {
            path: 'list-order-done',
            component: OrderDoneComponent
          },
          {
            path: 'list-order-cancel',
            component: OrderCancelComponent
          },
        ]
      },
      {
        path: 'account/change-information',
        component: ChangeInformationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
