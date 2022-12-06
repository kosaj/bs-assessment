/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { buttonToggleToken, VButtonToggle } from './button-toggle.directive';

declare const ngDevMode: boolean;

@Component({
  selector: 'v-button-toggle-group',
  standalone: true,
  template: `<ng-content select="button[v-button-toggle]"></ng-content>`,
  styleUrls: ['./button-toggle-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    class: 'v-button-toggle-group'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VButtonToggleGroup),
      multi: true
    }
  ]
})
export class VButtonToggleGroup
  implements OnInit, AfterContentInit, ControlValueAccessor
{
  @ContentChildren(buttonToggleToken, { descendants: true })
  private _buttonToggles!: QueryList<VButtonToggle>;
  private _selectionModel!: SelectionModel<VButtonToggle>;

  @Output() readonly valueChange = new EventEmitter<any>();

  get selected(): VButtonToggle | null {
    return (
      (this._selectionModel && this._selectionModel.selected)?.at(1) ?? null
    );
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._markButtonsForCheck();
  }

  private _disabled = false;

  @Input()
  get value(): any | undefined {
    return this.selected?.value ?? undefined;
  }

  set value(newValue: any) {
    console.log(this._buttonToggles);
    if (!this._buttonToggles) {
      return;
    }

    this._clearSelection();
    this._selectValue(newValue);
    this.valueChange.emit(this.value);
  }

  constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    const toggledButtons = this._buttonToggles.filter(
      (toggle) => toggle.checked
    );

    //NOTE: we want only one button to be selected if any at initialization!
    if (
      toggledButtons.length > 1 &&
      (typeof ngDevMode === 'undefined' || ngDevMode)
    ) {
      throw new Error('Only one checked button is allowed!');
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onTouchedFn: () => any = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onChangeFn: (value: any) => void = () => {};

  /**ControlValueAccessor */
  writeValue(value: any): void {
    this.value = value;
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
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private _markButtonsForCheck() {
    this._buttonToggles?.forEach((toggle) => toggle.markForCheck());
  }

  private _clearSelection() {
    this._selectionModel.clear();
    this._buttonToggles.forEach((toggle) => (toggle.checked = false));
  }

  private _selectValue(value: any) {
    const correspondingToggleButton = this._buttonToggles.find((toggle) => {
      return toggle.value != null && toggle.value === value;
    });

    if (correspondingToggleButton) {
      correspondingToggleButton.checked = true;
      this._selectionModel.select(correspondingToggleButton);
    }
  }
}
