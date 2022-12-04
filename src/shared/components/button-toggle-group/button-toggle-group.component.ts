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
  template: `<ng-content select="button[v-button-toggle]"></ng-content>`,
  styleUrls: ["./button-toggle-group.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "v-button-toggle-group",
  },
})
export class VButtonToggleGroup {}
