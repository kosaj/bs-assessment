/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation
} from '@angular/core';

const BUTTON_HOST_ATTRIBUTES = ['v-button', 'v-fab-button'];

@Component({
  selector: 'button[v-button] button[v-fab-button]',
  standalone: true,
  template: `
    <div class="v-button-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'v-base-button'
  }
})
export class VButton {
  constructor(private readonly _elementRef: ElementRef) {
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        (_elementRef.nativeElement as HTMLElement).classList.add(attr);
      }
    }
  }

  private _hasHostAttributes(...attributes: string[]): boolean {
    return attributes.some((attribute) =>
      this._elementRef.nativeElement.hasAttribute(attribute)
    );
  }
}
