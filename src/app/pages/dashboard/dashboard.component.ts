import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Bet } from "@app/models/bet.interface";
import { ApiService } from "@app/services/api.service";
import {
  SocketStatus,
  WebsocketService,
} from "@app/services/websocket.service";
import { BetFacade } from "@app/state/bet/bet.facade";
import { forkJoin, Subject, take, takeUntil, tap } from "rxjs";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>dashboard works!</h1>
    <button (click)="beginPooling()">Begin</button>
    <button (click)="endPooling()">End</button>
  `,
  styleUrls: ["./dashboard.component.scss"],
  providers: [ApiService, BetFacade],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  constructor(
    private readonly _apiService: ApiService,
    private readonly _websocketService: WebsocketService,
    private readonly _betFacade: BetFacade
  ) {}

  ngOnInit(): void {
    this._betFacade.initStore(30);

    this._websocketService.connected$
      .pipe(takeUntil(this._destroyed))
      .subscribe((status: SocketStatus) => console.log(status));

    this._websocketService.betUpdated$
      .pipe(takeUntil(this._destroyed))
      .subscribe((bets: Array<Bet>) => console.log(bets));

    forkJoin([
      this._apiService.generateBets(10),
      this._apiService.getBets(),
      this._apiService.getBet(5),
    ])
      .pipe(
        takeUntil(this._destroyed),
        tap(([generateBets, getBets, getBet]) => {
          console.log("generateBets", generateBets);
          console.log("getBets", getBets);
          console.log("getBet", getBet);
        })
      )
      .subscribe();
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
