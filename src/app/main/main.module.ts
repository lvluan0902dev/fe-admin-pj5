import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SliderListComponent } from './components/slider/slider-list/slider-list.component';
import { SliderAddComponent } from './components/slider/slider-add/slider-add.component';
import { SliderEditComponent } from './components/slider/slider-edit/slider-edit.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
// import { EditorModule } from 'primeng/editor';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ImageModule } from 'primeng/image';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TestimonialListComponent } from './components/testimonial/testimonial-list/testimonial-list.component';
import { TestimonialAddComponent } from './components/testimonial/testimonial-add/testimonial-add.component';
import { TestimonialEditComponent } from './components/testimonial/testimonial-edit/testimonial-edit.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { SafeHtmlPipe } from '../core/handlers/safe-html/safe-html.pipe';
import { BeautyImageListComponent } from './components/beauty-image/beauty-image-list/beauty-image-list.component';
import { BeautyImageAddComponent } from './components/beauty-image/beauty-image-add/beauty-image-add.component';
import { BeautyImageEditComponent } from './components/beauty-image/beauty-image-edit/beauty-image-edit.component';
import { FaqListComponent } from './components/faq/faq-list/faq-list.component';
import { FaqAddComponent } from './components/faq/faq-add/faq-add.component';
import { FaqEditComponent } from './components/faq/faq-edit/faq-edit.component';
import { AddressComponent } from './components/contact-setting/address/address.component';
import { PhoneNumberComponent } from './components/contact-setting/phone-number/phone-number.component';
import { EmailComponent } from './components/contact-setting/email/email.component';
import { GoogleMapsComponent } from './components/contact-setting/google-maps/google-maps.component';
import { ProductCategoryListComponent } from './components/product-category/product-category-list/product-category-list.component';
import { ProductCategoryAddComponent } from './components/product-category/product-category-add/product-category-add.component';
import { ProductCategoryEditComponent } from './components/product-category/product-category-edit/product-category-edit.component';
import { ProductBrandListComponent } from './components/product-brand/product-brand-list/product-brand-list.component';
import { ProductBrandAddComponent } from './components/product-brand/product-brand-add/product-brand-add.component';
import { ProductBrandEditComponent } from './components/product-brand/product-brand-edit/product-brand-edit.component';
import { StaffListComponent } from './components/staff/staff-list/staff-list.component';
import { StaffAddComponent } from './components/staff/staff-add/staff-add.component';
import { StaffEditComponent } from './components/staff/staff-edit/staff-edit.component';
import { MessageComponent } from './components/contact-manage/message/message.component';
import { NotificationEmailComponent } from './components/contact-manage/notification-email/notification-email.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { BlogCategoryListComponent } from './components/blog-category/blog-category-list/blog-category-list.component';
import { BlogCategoryAddComponent } from './components/blog-category/blog-category-add/blog-category-add.component';
import { BlogCategoryEditComponent } from './components/blog-category/blog-category-edit/blog-category-edit.component';
import { BlogAddComponent } from './components/blog/blog-add/blog-add.component';
import { BlogEditComponent } from './components/blog/blog-edit/blog-edit.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';

@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    SliderListComponent,
    SliderAddComponent,
    SliderEditComponent,
    TestimonialListComponent,
    TestimonialAddComponent,
    TestimonialEditComponent,
    SafeHtmlPipe,
    BeautyImageListComponent,
    BeautyImageAddComponent,
    BeautyImageEditComponent,
    FaqListComponent,
    FaqAddComponent,
    FaqEditComponent,
    AddressComponent,
    PhoneNumberComponent,
    EmailComponent,
    GoogleMapsComponent,
    ProductCategoryListComponent,
    ProductCategoryAddComponent,
    ProductCategoryEditComponent,
    ProductBrandListComponent,
    ProductBrandAddComponent,
    ProductBrandEditComponent,
    StaffListComponent,
    StaffAddComponent,
    StaffEditComponent,
    MessageComponent,
    NotificationEmailComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
    BlogCategoryListComponent,
    BlogCategoryAddComponent,
    BlogCategoryEditComponent,
    BlogAddComponent,
    BlogEditComponent,
    BlogListComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToolbarModule,
    EditorModule,
    InputSwitchModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    ImageModule,
    ConfirmDialogModule,
    InputTextareaModule,
    DropdownModule,
    DialogModule,
    FileUploadModule,
    HttpClientModule
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class MainModule { }
