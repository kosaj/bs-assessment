/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "v-button-toggle-group",
  standalone: true,
  template: ` <p>button-toggle-group works!</p> `,
  styleUrls: ["./button-toggle-group.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "v-button-toggle-group",
  },
})
export class VButtonToggleGroup {}
