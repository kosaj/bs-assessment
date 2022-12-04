/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @angular-eslint/directive-class-suffix */
/* eslint-disable @angular-eslint/directive-selector */
import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
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

  @Input()
  get checked(): boolean {
    return this._checked;
  }

  set checked(value: BooleanInput) {
    this._checked = coerceBooleanProperty(value);
  }

  private _checked = false;

  constructor(
    @Host()
    private readonly _toggleGroup: VButtonToggleGroup
  ) {}

  private _onButtonClick(): void {
    if (this._toggleGroup) {
      this._toggleGroup._onTouchedFn();
    }
  }
}
