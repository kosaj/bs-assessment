/* eslint-disable @angular-eslint/component-class-suffix */
import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [OverlayModule],
  template: `
    <button
          v-fab-button
          cdkOverlayOrigin
          #originOverlay="cdkOverlayOrigin"
          (click)="isOpen = true"
        >
          -
        </button>

        <ng-template
          cdkConnectedOverlay
          [cdkConnectedOverlayOrigin]="originOverlay"
          [cdkConnectedOverlayOpen]="isOpen"
          [cdkConnectedOverlayHasBackdrop]="true"
          (backdropClick)="isOpen = false"
        >
        <div #body role="region"
     
        >
          <ng-template [cdkPortalOutlet]="componentPortal"></ng-template>
        </div>
          
        </ng-template>
  `,
  styleUrls: ['./expansion-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VExpansionPanel {

  isOpen = false;
}
// [@bodyExpansion]="isOpen ? 'expanded' : 'collapsed'"
// (@bodyExpansion.done)="_bodyAnimationDone.next($event)"