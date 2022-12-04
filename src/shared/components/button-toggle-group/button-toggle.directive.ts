/* eslint-disable @angular-eslint/directive-class-suffix */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive, Input } from "@angular/core";

@Directive({
  selector: "v-button[v-button-toggle]",
  standalone: true,
})
export class VButtonToggle {
  @Input("v-button-toggle")
  get value(): any {
    return this.value;
  }

  set value(newValue: any) {
    console.log(newValue);
    this._value = newValue;
  }

  private _value!: any;
}
