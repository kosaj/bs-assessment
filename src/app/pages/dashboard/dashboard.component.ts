import { Component, OnDestroy, OnInit } from "@angular/core";
import { BetFacade } from "@app/+state/bet/bet.facade";
import { ApiService } from "@app/services/api.service";
import { GeoipDataService } from "@app/services/geoip-data.service";
import { Subject, take, takeUntil } from "rxjs";
import { VButtonToggleGroupModule } from "src/shared/components/button-toggle-group/button-toggle-group.module";
import { VButton } from "src/shared/components/button/button.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [VButton, VButtonToggleGroupModule],
  template: `
    <h1>dashboard works!</h1>
    <button (click)="beginPooling()">Begin</button>
    <button (click)="endPooling()">End</button>
    <v-button-toggle-group>
      <button v-button [v-button-toggle]="1">1</button>
      <button v-button [v-button-toggle]="2">2</button>
      <button v-button [v-button-toggle]="3">3</button>
    </v-button-toggle-group>
  `,
  styleUrls: ["./dashboard.component.scss"],
  providers: [BetFacade],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  constructor(
    private readonly _apiService: ApiService,
    private readonly _betFacade: BetFacade,
    private readonly _geoipDataService: GeoipDataService
  ) {}

  ngOnInit(): void {
    this._betFacade.initStore(30);
    this._betFacade.bets$.subscribe((bets) => console.log(bets));
  }

  beginPooling(): void {
    this._apiService
      .startPulling()
      .pipe(take(1), takeUntil(this._destroyed))
      .subscribe();
  }

  endPooling(): void {
    this._apiService
      .stopPulling()
      .pipe(take(1), takeUntil(this._destroyed))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.endPooling();

    this._destroyed.next();
    this._destroyed.complete();
  }
}
