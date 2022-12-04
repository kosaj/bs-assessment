/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @angular-eslint/directive-class-suffix */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive, forwardRef, InjectionToken, Input } from "@angular/core";

export const buttonToggleToken = new InjectionToken<VButtonToggle>(
  "buttonToggleToken"
);
@Directive({
  selector: "button[v-button-toggle]",
  exportAs: "vButtonToggle",
  standalone: true,
  host: {
    class: "v-button-toggle",
  },
  providers: [
    {
      provide: buttonToggleToken,
      useExisting: forwardRef(() => VButtonToggle),
    },
  ],
})
export class VButtonToggle {
  @Input("v-button-toggle")
  get value(): any {
    return this.value;
  }

  set value(newValue: any) {
    console.log("toggle value: ", newValue);
    this._value = newValue;
  }

  private _value!: any;
}
