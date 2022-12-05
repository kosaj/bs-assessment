import { DecimalPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import { Bet } from '@app/models/bet.interface';
import { VButtonToggleGroupModule } from 'src/shared/components/button-toggle-group/button-toggle-group.module';
import { VButton } from 'src/shared/components/button/button.component';

type Timer = ReturnType<typeof setTimeout>;
const HINT_CALLBACK_TIME = 500;

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
            [ngClass]="{
              odd: true,
              'value-increase': firstTeamDiff === '+',
              'value-decrease': firstTeamDiff === '-'
            }"
            >{{ item.teams[0].win | number : '1.2-2' }}</span
          >
        </span>
      </button>
      <button v-button [v-button-toggle]="2">
        <span class="flex-row">
          <span class="name">X</span>
          <span
            [ngClass]="{
              odd: true,
              'value-increase': drawDiff === '+',
              'value-decrease': drawDiff === '-'
            }"
            >{{ item.draw | number : '1.2-2' }}</span
          >
        </span>
      </button>
      <button v-button [v-button-toggle]="3">
        <span class="flex-row">
          <span class="name">2</span>
          <span
            [ngClass]="{
              odd: true,
              'value-increase': secondTeamDiff === '+',
              'value-decrease': secondTeamDiff === '-'
            }"
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

    this._hintTimer = setTimeout(() => {
      this._toggleHint();
      this._changeDetectorRef.markForCheck();
    }, HINT_CALLBACK_TIME);
  }

  get item(): Bet {
    return this._item;
  }

  get previousItem(): Bet | undefined {
    return this._previousItem;
  }

  get drawDiff(): '/' | '+' | '-' {
    return !!this.previousItem
      ? this._previousItem!.draw - this._item.draw
        ? '+'
        : '-'
      : '/';
  }

  get firstTeamDiff(): '/' | '+' | '-' {
    return !!this.previousItem
      ? this._previousItem!.teams[0].win - this._item.teams[0].win
        ? '+'
        : '-'
      : '/';
  }

  get secondTeamDiff(): '/' | '+' | '-' {
    return !!this.previousItem
      ? this._previousItem!.teams[1].win - this._item.teams[1].win
        ? '+'
        : '-'
      : '/';
  }

  private _item!: Bet;
  private _previousItem: Bet | undefined;

  constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    if (this._hintTimer) {
      clearTimeout(this._hintTimer);
    }
  }

  private _toggleHint(): void {
    this._elementRef.nativeElement.classList.toggle('app-match-row--hint');
  }
}
