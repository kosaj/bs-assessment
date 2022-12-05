import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ticket-bucket',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>ticket-bucket works!</p> `,
  styleUrls: ['./ticket-bucket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketBucketComponent {}
