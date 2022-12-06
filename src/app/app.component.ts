import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VButton } from '@shared/components/button/button.component';
import { map, Observable } from 'rxjs';
import { TicketBucketComponent } from './components/ticket-bucket/ticket-bucket.component';
import { TicketFixedBucketComponent } from './components/ticket-fixed-bucket/ticket-fixed-bucket.component';
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
    TicketFixedBucketComponent,
    VButton
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
          <app-ticket-fixed-bucket
            #fixedBucket="appTicketFixedBucket"
            class="bottom"
            [componentPortal]="ticketBucketComponentPortal"
          >
            <button v-fab-button (click)="fixedBucket.toggle()">-</button>
          </app-ticket-fixed-bucket>
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
