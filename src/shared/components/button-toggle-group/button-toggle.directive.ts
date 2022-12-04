/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @angular-eslint/directive-class-suffix */
/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  forwardRef,
  Host,
  InjectionToken,
  Input,
} from "@angular/core";
import { VButtonToggleGroup } from "./button-toggle-group.component";

export const buttonToggleToken = new InjectionToken<VButtonToggle>(
  "buttonToggleToken"
);
@Directive({
  selector: "button[v-button-toggle]",
  exportAs: "vButtonToggle",
  standalone: true,
  host: {
    class: "v-button-toggle",
    "(click)": "_onButtonClick()",
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

  constructor(
    @Host()
    private readonly _toggleGroup: VButtonToggleGroup
  ) {}

  _onButtonClick(event: MouseEvent): void {
    // event.preventDefault();
    // console.log("click", this.value);
    console.log("hello");
  }
}
