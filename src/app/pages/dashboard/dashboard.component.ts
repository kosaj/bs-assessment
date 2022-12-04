import { AsyncPipe, NgFor } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { BetFacade } from "@app/+state/bet/bet.facade";
import { MatchRowComponent } from "@app/components/match-row/match-row.component";
import { Bet } from "@app/models/bet.interface";
import { ApiService } from "@app/services/api.service";
import { GeoipDataService } from "@app/services/geoip-data.service";
import { Observable, Subject, take, takeUntil } from "rxjs";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [NgFor, AsyncPipe, MatchRowComponent],
  template: `
    <h1>dashboard works!</h1>
    <button (click)="beginPooling()">Begin</button>
    <button (click)="endPooling()">End</button>
    <app-match-row
      [item]="bet"
      *ngFor="let bet of allBets$ | async; trackBy: betById"
    ></app-match-row>
  `,
  styleUrls: ["./dashboard.component.scss"],
  providers: [BetFacade],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();
  readonly allBets$: Observable<Array<Bet>> = this._betFacade.allBets$;

  constructor(
    private readonly _apiService: ApiService,
    private readonly _betFacade: BetFacade,
    private readonly _geoipDataService: GeoipDataService
  ) {}

  ngOnInit(): void {
    this._betFacade.initStore(30);
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

  betById(index: number, bet: Bet): number {
    return bet.id;
  }
}
