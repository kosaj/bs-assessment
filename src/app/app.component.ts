import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, Observable } from 'rxjs';
import { VExpansionPanel } from 'src/shared/components/expansion-panel/components/expansion-panel.component';
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
    VExpansionPanel
  ],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
    <aside>
      <span #contentWrapper class="aside-content-wrapper">
        <span class="right" *ngIf="minWidth64em$ | async; else mobileBucket">
          <ng-template
            [cdkPortalOutlet]="ticketBucketComponentPortal"
          ></ng-template>
        </span>
        <ng-template #mobileBucket>
          <v-expansion-panel
            class="bottom"
            [componentPortal]="ticketBucketComponentPortal"
          >
          </v-expansion-panel>
        </ng-template>
      </span>
    </aside>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly ticketBucketComponentPortal = new ComponentPortal(
    TicketBucketComponent
  );

  readonly minWidth64em$: Observable<boolean> = this._breakpointObserver
    .observe(['(min-width: 64em)'])
    .pipe(map((result) => result.matches));

  constructor(private readonly _breakpointObserver: BreakpointObserver) {}
}
