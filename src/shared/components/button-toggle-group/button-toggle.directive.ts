/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @angular-eslint/directive-class-suffix */
/* eslint-disable @angular-eslint/directive-selector */
import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  forwardRef,
  Host,
  InjectionToken,
  Input,
  Output
} from "@angular/core";
import { VButtonToggleGroup } from "./button-toggle-group.component";

export const buttonToggleToken = new InjectionToken<VButtonToggle>(
  "buttonToggleToken"
);

export class VButtonToggleChange {
  constructor(public source: VButtonToggle, public value: any) {}
}

@Directive({
  selector: "button[v-button-toggle]",
  exportAs: "vButtonToggle",
  standalone: true,
  host: {
    role: "presentation",
    class: "v-button-toggle",
    "[class.v-button-toggle--checked]": "checked",
    "[class.v-button-toggle--disabled]": "disabled",
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
  @Output()
  readonly changed: EventEmitter<VButtonToggleChange> =
    new EventEmitter<VButtonToggleChange>();

  @Input("v-button-toggle")
  get value(): any {
    return this.value;
  }

  set value(newValue: any) {
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

  @Input()
  get disabled(): boolean {
    return this._disabled || (this._toggleGroup && this._toggleGroup.disabled);
  }

  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }

  private _disabled: boolean = false;

  constructor(
    @Host()
    private readonly _toggleGroup: VButtonToggleGroup,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {}

  private _onButtonClick(): void {
    if (this.checked) {
      return;
    }

    if (this._toggleGroup) {
      this._checked = true;
      this._toggleGroup._onTouchedFn();
    }

    this.changed.emit(new VButtonToggleChange(this, this.value));
  }

  markForCheck(): void {
    this._changeDetectorRef.markForCheck();
  }
}
