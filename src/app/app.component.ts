import { PortalModule } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VButton } from 'src/shared/components/button/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PortalModule, VButton],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
    <aside>
      <!--  -->
    </aside>

    <span class="absolute">
      <button v-fab-button>-</button>
    </span>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}
}
