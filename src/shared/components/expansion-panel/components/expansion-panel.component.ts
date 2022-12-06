/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/component-class-suffix */
import { OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { VButton } from '../../button/button.component';

@Component({
  selector: 'v-expansion-panel',
  standalone: true,
  imports: [OverlayModule, VButton],
  template: `
    <button
      v-fab-button
      cdkOverlayOrigin
      #originOverlay="cdkOverlayOrigin"
      (click)="expanded = true"
    >
      -
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="originOverlay"
      [cdkConnectedOverlayOpen]="expanded"
      [cdkConnectedOverlayHasBackdrop]="true"
      (backdropClick)="expanded = false"
    >
      <div
        role="region"
        #body
        [@bodyExpansion]="expanded ? 'expanded' : 'collapsed'"
      >
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  styleUrls: ['./expansion-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'v-expansion-panel',
    '[class.v-expansion-panel--expanded]': 'expanded'
  }
})
export class VExpansionPanel {
  get expanded(): boolean {
    return this._expanded;
  }

  set expanded(value: boolean) {
    this._expanded = value;
  }

  private _expanded = false;

  close(): void {
    this.expanded = false;
  }

  open(): void {
    this.expanded = true;
  }

  toggle(): void {
    this.expanded = !this.expanded;
  }
}
