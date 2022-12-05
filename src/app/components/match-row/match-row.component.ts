import { DecimalPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import { Bet } from '@app/models/bet.interface';
import { VButtonToggleGroupModule } from 'src/shared/components/button-toggle-group/button-toggle-group.module';
import { VButton } from 'src/shared/components/button/button.component';

type Timer = ReturnType<typeof setTimeout>;
const HINT_CALLBACK_TIME = 1000;

@Component({
  selector: 'app-match-row',
  standalone: true,
  imports: [DecimalPipe, VButton, VButtonToggleGroupModule, NgClass],
  template: `
    <div>
      <div class="team-name">{{ item.teams[0].name }}</div>
      <div class="team-name">{{ item.teams[1].name }}</div>
    </div>
    <v-button-toggle-group>
      <button v-button [v-button-toggle]="1">
        <span class="flex-row">
          <span class="name">1</span>
          <span
            class="odd"
            [class.value-increase]="{}"
            [class.value-decrease]="{}"
            >{{ item.teams[0].win | number : '1.2-2' }}</span
          >
        </span>
      </button>
      <button v-button [v-button-toggle]="2">
        <span class="flex-row">
          <span class="name">X</span>
          <span
            class="odd"
            [class.value-increase]="{}"
            [class.value-decrease]="{}"
            >{{ item.draw | number : '1.2-2' }}</span
          >
        </span>
      </button>
      <button v-button [v-button-toggle]="3">
        <span class="flex-row">
          <span class="name">2</span>
          <span
            class="odd"
            [class.value-increase]="{}"
            [class.value-decrease]="{}"
            >{{ item.teams[1].win | number : '1.2-2' }}</span
          >
        </span>
      </button>
    </v-button-toggle-group>
  `,
  styleUrls: ['./match-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchRowComponent implements OnDestroy {
  private _hintTimer: Timer | undefined;

  @Input()
  set item(value: Bet) {
    this._previousItem = this._item;
    this._item = value;

    if (this._hintTimer) {
      clearTimeout(this._hintTimer);
    }

    this._toggleHint();
    this._hintTimer = setTimeout(() => this._toggleHint(), HINT_CALLBACK_TIME);
  }

  get item(): Bet {
    return this._item;
  }

  get previousItem(): Bet | undefined {
    return this._previousItem;
  }

  private _item!: Bet;
  private _previousItem: Bet | undefined;

  constructor(private readonly _elementRef: ElementRef<HTMLElement>) {}

  ngOnDestroy(): void {
    if (this._hintTimer) {
      clearTimeout(this._hintTimer);
    }
  }

  private _toggleHint(): void {
    this._elementRef.nativeElement.classList.toggle('match-row--hint');
  }
}
