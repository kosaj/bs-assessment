import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
    <aside>
      <!--  -->
    </aside>

    <span class="absolute">
      <button>SHOW</button>
    </span>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
