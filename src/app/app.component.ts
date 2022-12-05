import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { PortalModule } from '@angular/cdk/portal';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, Observable } from 'rxjs';
import { VButton } from 'src/shared/components/button/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PortalModule, LayoutModule, NgIf, AsyncPipe, VButton],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
    <ng-container
      *ngIf="hideAside$ | async; else absoluteTemplate"
    ></ng-container>
    <aside *ngIf="hideAside$ | async">
      <!--  -->
    </aside>

    <ng-template #absoluteTemplate>
      <span class="absolute">
        <button v-fab-button>-</button>
      </span>
    </ng-template>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly hideAside$: Observable<boolean> = this._breakpointObserver
    .observe(['(min-width: 64em)'])
    .pipe(map((result) => result.matches));

  constructor(private readonly _breakpointObserver: BreakpointObserver) {}
}
