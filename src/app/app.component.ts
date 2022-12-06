import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { ConnectionPositionPair, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { VButton } from 'src/shared/components/button/button.component';
import { bodyExpansionAnimations } from '../shared/components/expansion-panel/animations/open-close.animation';
import { TicketBucketComponent } from './components/ticket-bucket/ticket-bucket.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PortalModule,
    LayoutModule,
    OverlayModule,
    NgIf,
    AsyncPipe,
    VButton,
  ],
   
  animations: [bodyExpansionAnimations.bodyExpansion],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
    <ng-container
      *ngIf="minWidth64em$ | async; else absoluteTemplate"
    ></ng-container>
    <aside *ngIf="minWidth64em$ | async">
      <ng-template [cdkPortalOutlet]="componentPortal"></ng-template>
    </aside>

    <ng-template #absoluteTemplate>
      <span class="fixed">
        
        
      </span>
    </ng-template>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly positions = [
    new ConnectionPositionPair(
      { originX: 'center', originY: 'bottom' },
      { overlayX: 'start', overlayY: 'top' }
    ),
  ];
  readonly componentPortal = new ComponentPortal(TicketBucketComponent);
  readonly minWidth64em$: Observable<boolean> = this._breakpointObserver
    .observe(['(min-width: 64em)'])
    .pipe(
      map((result) => result.matches),
      tap((state) => {
        if (state) {
          this.isOpen = false;
        }
      })
    );

  isOpen = false;

  constructor(private readonly _breakpointObserver: BreakpointObserver) {}
}
