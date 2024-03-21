import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() btnClasses:any;
  @Input() btnType: string;
  @Input() navigateTo:string;
  @Input() disableValue:boolean;
}
