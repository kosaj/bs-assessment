/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { SelectionModel } from "@angular/cdk/collections";
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  OnInit,
  QueryList,
  ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { buttonToggleToken, VButtonToggle } from "./button-toggle.directive";

declare const ngDevMode: boolean;

@Component({
  selector: "v-button-toggle-group",
  standalone: true,
  template: `<ng-content select="button[v-button-toggle]"></ng-content>`,
  styleUrls: ["./button-toggle-group.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "v-button-toggle-group",
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VButtonToggleGroup),
      multi: true,
    },
  ],
})
export class VButtonToggleGroup
  implements OnInit, AfterContentInit, ControlValueAccessor
{
  @ContentChildren(buttonToggleToken, { descendants: true })
  private _buttonToggles!: QueryList<VButtonToggle>;
  private _selectionModel!: SelectionModel<VButtonToggle>;

  constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    const toggledButtons = this._buttonToggles.filter(
      (toggle) => toggle.checked
    );

    //NOTE: we want only one button to be selected if any at initialization!
    if (
      toggledButtons.length > 1 &&
      (typeof ngDevMode === "undefined" || ngDevMode)
    ) {
      throw new Error("Only one checked button is allowed!");
    }

    this._selectionModel.select(
      ...this._buttonToggles.filter((toggle) => toggle.checked)
    );
  }

  ngOnInit(): void {
    this._selectionModel = new SelectionModel<VButtonToggle>(
      false,
      undefined,
      false
    );
  }

  _onTouchedFn: () => any = () => {};
  _onChangeFn: (value: any) => void = () => {};

  /**ControlValueAccessor */
  writeValue(obj: any): void {
    // this.value = value;
    this._changeDetectorRef.markForCheck();
  }

  /**ControlValueAccessor */
  registerOnChange(fn: any): void {
    this._onChangeFn = fn;
  }

  /**ControlValueAccessor */
  registerOnTouched(fn: any): void {
    this._onTouchedFn = fn;
  }

  /**ControlValueAccessor */
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
}
