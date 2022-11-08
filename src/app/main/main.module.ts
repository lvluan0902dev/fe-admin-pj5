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
    InputTextareaModule
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class MainModule { }
