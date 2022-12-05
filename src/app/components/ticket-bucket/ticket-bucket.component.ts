import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GeoipDataService } from '@app/services/geoip-data.service';

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
        <div>
          {{ 12.34 }}<span class="currency-symbol">{{ symbol }}</span>
        </div>
      </button>
    </div>
  `,
  styleUrls: ['./ticket-bucket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketBucketComponent {
  get symbol(): string {
    return this._geoipDataService.value!.currency.symbolNative;
  }
  constructor(private readonly _geoipDataService: GeoipDataService) {}
}
