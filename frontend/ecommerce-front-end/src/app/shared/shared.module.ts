import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { FormComponent } from './components/form/form.component';
import { InputComponent } from './components/input/input.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';



@NgModule({
  declarations: [
    ButtonComponent,
    FormComponent,
    InputComponent,
    RadioButtonComponent,
    SearchComponent,
    AlertBoxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    ButtonComponent,
    FormComponent,
    InputComponent,
    RadioButtonComponent,
    SearchComponent,
    AlertBoxComponent,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
})
export class SharedModule { }
