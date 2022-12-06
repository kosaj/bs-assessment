/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/component-class-suffix */
import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
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
          (click)="isOpen = true"
        >-</button>  
 
        <ng-template
          cdkConnectedOverlay
          [cdkConnectedOverlayOrigin]="originOverlay"
          [cdkConnectedOverlayOpen]="isOpen"
          [cdkConnectedOverlayHasBackdrop]="true"
          (backdropClick)="isOpen = false"   
        >
          <div role="region" #body  [@bodyExpansion]="isOpen ? 'expanded' : 'collapsed'">
            <ng-content></ng-content>
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