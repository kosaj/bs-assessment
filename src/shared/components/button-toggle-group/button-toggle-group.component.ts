/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  QueryList,
  ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { tap } from "rxjs";
import { buttonToggleToken, VButtonToggle } from "./button-toggle.directive";

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
export class VButtonToggleGroup implements AfterViewInit, ControlValueAccessor {
  @ContentChildren(buttonToggleToken, { descendants: true })
  private _buttonToggles!: QueryList<VButtonToggle>;

  constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this._buttonToggles.changes
      .pipe(tap(() => this._changeDetectorRef.markForCheck()))
      .subscribe();
  }

  _onTouched: () => any = () => {};

  writeValue(obj: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
}
