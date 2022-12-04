/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "button[v-button]",
  standalone: true,
  template: `
    <div class="v-button-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ["./button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "v-base-button v-button",
  },
})
export class VButton {}
