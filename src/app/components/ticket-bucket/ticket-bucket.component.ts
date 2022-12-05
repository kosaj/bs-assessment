import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ticket-bucket',
  standalone: true,
  imports: [],
  template: `
    <div class="bucket-header">
      <span class="header-counter">
        <!-- TODO: counter -->
        {{ 7 }}
      </span>
      <span>
        <!-- TODO: title -->
        Tickets
      </span>
    </div>
    <div class="bucket-content">
      <!-- TODO: list of selected tickets -->
    </div>
    <div class="bucket-actions">
      <input type="text" />
      <button>
        <div>Zaloguj się i graj o</div>
        <div>{{ 12.34 }}</div>
      </button>
    </div>
  `,
  styleUrls: ['./ticket-bucket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketBucketComponent {}
