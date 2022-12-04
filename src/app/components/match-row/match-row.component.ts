import { DecimalPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Bet } from "@app/models/bet.interface";
import { VButtonToggleGroupModule } from "src/shared/components/button-toggle-group/button-toggle-group.module";
import { VButton } from "src/shared/components/button/button.component";

@Component({
  selector: "app-match-row",
  standalone: true,
  imports: [DecimalPipe, VButton, VButtonToggleGroupModule],
  template: `
    <div>
      <div>{{ item.teams[0].name }}</div>
      <div>{{ item.teams[1].name }}</div>
    </div>
    <v-button-toggle-group>
      <button v-button [v-button-toggle]="1">
        <span class="name">1</span>
        <span class="odd">{{ item.teams[0].win | number : "1.2-2" }}</span>
      </button>
      <button v-button [v-button-toggle]="2">
        <span class="name">X</span>
        <span class="odd">{{ item.draw | number : "1.2-2" }}</span>
      </button>
      <button v-button [v-button-toggle]="3">
        <span class="name">2</span>
        <span class="odd">{{ item.teams[1].win | number : "1.2-2" }}</span>
      </button>
    </v-button-toggle-group>
  `,
  styleUrls: ["./match-row.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchRowComponent {
  @Input()
  set item(value: Bet) {
    this._item = value;
  }

  get item(): Bet {
    return this._item;
  }

  private _item!: Bet;
  private _previousItem: Bet | undefined;
}