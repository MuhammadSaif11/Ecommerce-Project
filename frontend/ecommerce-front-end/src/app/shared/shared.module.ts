import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { FormComponent } from './components/form/form.component';
import { InputComponent } from './components/input/input.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { SearchComponent } from './components/search/search.component';



@NgModule({
  declarations: [
    ButtonComponent,
    FormComponent,
    InputComponent,
    RadioButtonComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ButtonComponent,
    FormComponent,
    InputComponent,
    RadioButtonComponent,
    SearchComponent
  ]
})
export class SharedModule { }
